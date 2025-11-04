// Simple tests for calendar functionality
const fs = require('fs');
const path = require('path');

// Test counter
let passed = 0;
let total = 0;

function test(description, testFunction) {
    total++;
    try {
        const result = testFunction();
        if (result) {
            console.log(`✓ ${description}`);
            passed++;
        } else {
            console.log(`✗ ${description}`);
        }
    } catch (error) {
        console.log(`✗ ${description} - Error: ${error.message}`);
    }
}

function runTests() {
    console.log('Running Calendar Tests...\n');

    // Test 1: Check if required files exist
    test('index.html should exist', function () {
        return fs.existsSync('index.html');
    });

    test('script.js should exist', function () {
        return fs.existsSync('script.js');
    });

    test('styles.css should exist', function () {
        return fs.existsSync('styles.css');
    });

    test('SportradarGames.json should exist', function () {
        return fs.existsSync('SportradarGames.json');
    });

    // Test 2: Check JSON data structure
    test('JSON data should be valid and have events', function () {
        var jsonData = JSON.parse(fs.readFileSync('SportradarGames.json', 'utf8'));
        return jsonData.data && Array.isArray(jsonData.data) && jsonData.data.length > 0;
    });

    // Test 3: Check HTML structure
    test('HTML should have required elements', function () {
        var html = fs.readFileSync('index.html', 'utf8');
        var requiredIds = ['calendar-days', 'current-month', 'add-event-form', 'sport-filter'];
        let allFound = true;
        for (let i = 0; i < requiredIds.length; i++) {
            if (!html.includes('id="' + requiredIds[i] + '"')) {
                allFound = false;
                break;
            }
        }
        return allFound;
    });

    // Test 4: Check JavaScript functions
    test('JavaScript should have main functions', function () {
        var js = fs.readFileSync('script.js', 'utf8');
        var requiredFunctions = ['loadEvents', 'showCalendar', 'addNewEvent'];
        let allFound = true;
        for (let i = 0; i < requiredFunctions.length; i++) {
            if (!js.includes('function ' + requiredFunctions[i])) {
                allFound = false;
                break;
            }
        }
        return allFound;
    });

    // Test 5: Check CSS styling
    test('CSS should have responsive design', function () {
        var css = fs.readFileSync('styles.css', 'utf8');
        return css.includes('@media') && css.includes('max-width');
    });

    // Test 6: Check localStorage implementation
    test('JavaScript should use localStorage', function () {
        var js = fs.readFileSync('script.js', 'utf8');
        return js.includes('localStorage.getItem') && js.includes('localStorage.setItem');
    });

    // Test 7: Check package.json
    test('package.json should exist and have start script', function () {
        if (!fs.existsSync('package.json')) return false;
        var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        return pkg.scripts && pkg.scripts.start;
    });

    // Summary
    console.log('\n--- Test Results ---');
    console.log(passed + '/' + total + ' tests passed');

    if (passed === total) {
        console.log('🎉 All tests passed!');
        process.exit(0);
    } else {
        console.log('❌ Some tests failed');
        process.exit(1);
    }
}

// Run tests
runTests();