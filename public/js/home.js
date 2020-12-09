import {changeColor, changeSize, playAction} from "./animate.js"

let mainMenu, interactMenu, walkSettingsMenu, walkingMenu, summaryMenu, feedSettingsMenu, customizeMenu;
let current, previous;
let walkDistance = 1, currentWalkDistance = 0, walking = false;;
let feedFood;
let size, color;
let newSize = size, newColor = color;
let stats = {
    level: 1,
    energy: 100,
    thirst: 80,
    hunger: 80
}

async function switchTab(from, to) {
    await from.fadeOut(200).promise();
    to.fadeIn(200).promise();
    current = to;
    switch(current) {
        case interactMenu:
            previous = mainMenu;
            break;
        case feedSettingsMenu:
        case walkSettingsMenu:
            previous = interactMenu;
            break;
        default:
            previous = mainMenu;
    }
}

function setStats(){
    for(let stat in stats) {
        //console.log(stat)
        $(`#${stat}-text`).text(stats[stat].toFixed(0));
    }
    window.localStorage.setItem('stats', JSON.stringify(stats));
}

$(document).ready(async ()=>{
    mainMenu =  $('#main-menu');
    interactMenu =  $('#interact-menu');
    walkSettingsMenu = $('#walk-settings-menu');
    walkingMenu = $('#walking-menu');
    summaryMenu = $('#summary-menu');
    feedSettingsMenu = $('#feed-settings-menu');
    customizeMenu = $('#customize-menu');
    current = mainMenu;
    previous = mainMenu;

    let savedSize = window.localStorage.getItem('size');
    let savedColor = window.localStorage.getItem('color');
    if(savedSize) size = savedSize; else size = 'medium';
    if(savedColor) color = savedColor; else color = 'yellow';
    await sleep(500);
    changeColor(color);
    changeSize(size);
    let statsString = window.localStorage.getItem('stats');
    if (statsString) stats = JSON.parse(statsString);
    setStats();

    if (window.location.href.split('#').length > 1) {
        let view = window.location.href.split('#')[1];
        if (view == 'customize') {
            mainMenu.css('display', 'none');
            customizeMenu.css('display', '');
            current = customizeMenu;
        } else {
            mainMenu.css('display', '');
        }
    } else {
        mainMenu.css('display', '');
    }

    $('#interact-container canvas').click(e=>{
        playAction('Jump');
        playAction('Idle');
        if (walking) {
            playAction('Walk');
        }
    })

    $('.back-button').click(()=>{
        switchTab(current, previous);
    })

    $('#interact-button').click((e)=>{
        switchTab(mainMenu, interactMenu);
    });

    $('#walk-button').click((e)=>{
        switchTab(current, walkSettingsMenu);
    });

    $('#commit-walk-button').click(()=>{
        currentWalkDistance = 0;
        $('#stop-walking-button').text('Stop Early');
        beginWalk();
        walkDistance = $('input#walk-distance').val();
        switchTab(current, walkingMenu);
    });

    async function beginWalk() {
        walking = true;
        playAction('Walk');
        while(currentWalkDistance < walkDistance && walking) {
            await sleep(100);
            currentWalkDistance += 0.01;
            let percent =currentWalkDistance / walkDistance * 100;
            $('#walk-progress-bar').css('width', percent + '%');
            $('#walk-progress-text').text(`${currentWalkDistance.toFixed(2)}/${walkDistance} miles`);
            stats.thirst -= 0.1;
            stats.hunger -= 0.05;
            stats.energy -= 0.03;
            stats.thirst = Math.max(0, stats.thirst);
            stats.hunger = Math.max(0, stats.hunger);
            stats.energy = Math.max(0, stats.energy);
            setStats();
        }
        walking = false;
        $('#stop-walking-button').text('Complete');
        playAction('Jump');
        await sleep(1000);
        playAction('Idle');
    }

    $('#stop-walking-button').click(()=>{
        walking = false;
        let progress = currentWalkDistance;
        stats.level += progress;
        setStats();
        if (current == walkingMenu)
            $('#summary-text').text(`You walked ${progress.toFixed(2)} miles together!`);
        switchTab(current, summaryMenu);

    });

    $('#feed-button').click(()=>{
        $('.food-option').removeClass('selected');
        $('#commit-feed-button').prop('disabled', true);
        switchTab(current, feedSettingsMenu);
    })

    $('.food-option').click((e)=>{
        //console.log($(e.target))
        $('.food-option').removeClass('selected');
        $(e.target).addClass('selected');
        feedFood = $(e.target).attr('food');
        $('#commit-feed-button').prop('disabled', false);
    })

    $('#commit-feed-button').click((e)=>{
        playAction('Eat');
        let targetStats = Object.assign({}, stats);
        if (feedFood == 'food') {
            targetStats.hunger = Math.min(100, stats.hunger + 35);
        } else if (feedFood == 'water') {
            targetStats.thirst = Math.min(100, stats.hunger + 50);
        }
        stats.level += 0.5;
        $('#summary-text').text(`Your pet is happy!`);
        switchTab(current, summaryMenu);
        interpolateStats(targetStats);
    })

    $('#customize-button').click(()=>{
        $('.customize-option[option-type=size]').removeClass('selected');
        $('.customize-option[option-type=color]').removeClass('selected');
        $(`.customize-option[option-type=size][option-value=${size}]`).addClass('selected');
        $(`.customize-option[option-type=color][option-value=${color}]`).addClass('selected');
        switchTab(current, customizeMenu);
    })

    $('.customize-option').click((e)=> {
        let type = $(e.target).attr('option-type');
        let value = $(e.target).attr('option-value');

        if (type == 'size') {
            changeSize(value);
            newSize = value;
            $('.customize-option[option-type=size]').removeClass('selected');
        }
        if (type == 'color') {
            changeColor(value);
            newColor = value;
            $('.customize-option[option-type=color]').removeClass('selected');
        }
        $(e.target).addClass('selected');
    })

    $('#commit-customize-button').click(()=>{
        size = newSize;
        color = newColor;
        switchTab(current, mainMenu);
        window.localStorage.setItem('size', size);
        window.localStorage.setItem('color', color);
    })

    $('#cancel-customize-button').click(()=>{
        changeSize(size);
        changeColor(color);
        switchTab(current, mainMenu);
    })

});

async function interpolateStats(targetStats) {
    let originalStas = Object.assign({}, stats);
    for (let i = 0; i < 100; i++) {
        stats.hunger = originalStas.hunger + (targetStats.hunger - originalStas.hunger)*(i/100);
        stats.thirst = originalStas.thirst + (targetStats.thirst - originalStas.thirst)*(i/100);
        setStats();
        await sleep(10);
    }
    playAction('Idle');
    playAction('Jump');
    await sleep(700);
    playAction('Idle');

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
