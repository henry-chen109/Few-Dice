let populated = false;

let rand_time = getRandomNum(5000, 12000);

function checkLuckStat() {
    const luck_options = O("luck-stat");

    luck_options.addEventListener("change", event => {
        [...luck_options.children].forEach( op => {
            if ( op.selected && op.id != "disabled-option")
                revealText(op.value);
        })
    });
}

function revealText(value) {
    S("luck-check").display = "block";

    let emoji_select = O("emoji-based-on-selection");
    switch(value) {
        case "excellent":
            emoji_select.innerHTML = "😈";
            break;
        case "good":    
            emoji_select.innerHTML = "😒";
            break;

        case "mediocre":
            emoji_select.innerHTML = "😏";
            break;
        
        case "awful":
            emoji_select.innerHTML = "😀";
            break;
    }
}

function validateInfo() {
    if ( O("disabled-option").selected || !O("name").value)
        alert("Please Enter a Name and/or Select Your Luck Status");
    else 
        rollDice();
}

function populateDiceImg() {
    for(let i = 1; i <= 3; i++) {
        let first_dice = document.createElement("img");
        first_dice.src = `./media/1_face.svg`;
        first_dice.style.width = "100px";
        first_dice.style.height = "100px";
        O(`dice-container-${i}`).appendChild(first_dice);
    }

    populated = true;
}

function rollDice() {
    if (!populated)
        populateDiceImg();
    

    for(let i = 1; i <= 3; i++) {    
        animateDice(O(`dice-container-${i}`), rand_time);
    }

        
    setTimeout( function() {
        let dice_1_rolled = O(`dice-container-1`).firstElementChild.id;
        let dice_2_rolled = O(`dice-container-2`).firstElementChild.id;
        let dice_3_rolled = O(`dice-container-3`).firstElementChild.id;

        rolledText(dice_1_rolled, dice_2_rolled, dice_3_rolled);
    }, rand_time + 1700);
    



}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function animateDice(dice_container, time) {
    let end_time = time;
    let seconds = 1000;
    let current_time = 0;
    
    let loop_interval = setInterval( function() {
        let random_img_num = getRandomNum(1, 6);
        dice_container.firstElementChild.src = `./media/${random_img_num}_face.svg`;
        dice_container.firstElementChild.id = `${random_img_num}`;

        if (current_time >= end_time) {
            clearInterval(loop_interval)
            return;
        }

        current_time += seconds

    }, seconds)

}

function rolledText(dice_1, dice_2, dice_3) {
    
}

function run() {
    checkLuckStat();
}

run();