//function: pickUpNearestCoin
hero.pickUpNearestCoin = function() {
    var items = hero.findItems();
    var nearestCoin = findOptimalCoin(items);
    if(nearestCoin) {
        hero.move(nearestCoin.pos);
    }
};

// This function has your hero summon a soldier.
hero.summonSoldier = function() {
    // Fill in code here to summon a soldier if you have enough gold.
    if(hero.gold>=hero.costOf("soldier"))
        hero.summon("soldier");
};

// This function commands your soldiers to attack their nearest enemy.
hero.commandSoldiers = function() {
    var friends = hero.findFriends();
    for(var i=0; i < friends.length; i++) {
        var enemy = friends[i].findNearestEnemy();
        if(enemy) {
            hero.command(friends[i],"attack", enemy);
        }
    }
};
//Mejor Moneda
function findOptimalCoin(coins){
    var mxCoin=0;
    var MinDistanCoin=9999999;
    var distance=9999999;
    var Coin = null;
    var i=0;
    
    while (i<coins.length) {
        distance = hero.distanceTo(coins[i]);
        if(coins[i].value/distance>mxCoin){
                Coin=coins[i];
                mxCoin=coins[i].value/distance;
        }
        
        i++;
    }
    return Coin;
}
//Atacar
hero.attackCleave = function (Objetiv) {
    var distance =hero.distanceTo(Objetiv);
    if (distance <= 60 || Objetiv.type == "thrower" || Objetiv.type == "shaman") {
        while(Objetiv.health>0){
                if(hero.canCast("chain-lightning", Objetiv))
                        hero.cast("chain-lightning", Objetiv);
                    else
                        if(hero.isReady("bash"))
                            hero.bash(Objetiv);
                        else
                            if(hero.isReady("cleave") && distance <= 10)
                                hero.cleave(Objetiv);
                            else
                                 hero.attack(Objetiv);
                            if(hero.canElectrocute(Objetiv))
                            hero.electrocute(Objetiv);
            }
    }
};
//Mas fuerte
function findMostHealth(enemies) {
    var target = null;
    var targetHealth = 0;
    var enemyIndex = 0;
    while(enemyIndex < enemies.length) {
        var enemy = enemies[enemyIndex];
        if(enemy.health > targetHealth) {
            target = enemy;
            targetHealth = enemy.health;
        }
        enemyIndex += 1;
    }
    return target;
}

// Protect the cage.
// Put a soldier at each X.
var points = [];
points[0] = {x: 33, y: 42};
points[1] = {x: 47, y: 42};
points[2] = {x: 33, y: 26};
points[3] = {x: 47, y: 26};

// 1. Collect 80 gold.
while(hero.gold<=80){
    var coin = hero.findNearest(hero.findItems());
    hero.moveXY(coin.pos.x, coin.pos.y);
}
// 2. Build 4 soldiers.
for(var i=0; i < 4; i++) {
    hero.moveXY(points[i].x,points[i].y);
    hero.summon("soldier");
}
hero.moveXY(40,34);
// 3. Send your soldiers into position.
while(true) {
    var friends = hero.findFriends();
    for(var j=0; j < friends.length; j++) {
        var point = points[j];
        var friend = friends[j];
        var enemy = friend.findNearestEnemy();
        if(enemy && enemy.team == "ogres" && friend.distanceTo(enemy) < 8) {
            // Command friend to attack.
            hero.command(friend, "attack", enemy);
        } else {
            // Command friend to move to point.
            hero.command(friend, "move", point);
        }
    }
}
