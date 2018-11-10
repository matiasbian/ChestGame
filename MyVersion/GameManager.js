class GameManager{
    constructor(itemAmount,create,time){
        this.itemAmount = itemAmount;
        this.create = create;
        this.currentAmount = 0;
        this.score = 0;
        this.time = time;
    }

    GameFinished(){
        return this.itemAmount == this.currentAmount || this.time <= 0;
    }

    Score(){
        return this.score
    }

    StartTimer(){
        var timedEvent = this.create.time.delayedCall(3000, this.onEvent, [], this);
    }

    onEvent(){
        this.time -=1;
        if (this.time > 0){
            this.StartTimer()
        }
        console.log(this.time);
    }


}



