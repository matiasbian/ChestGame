class GameManager{
    constructor(objectAmount,create,time){
        this.objectAmount = objectAmount;
        this.create = create;
        this.currentAmount = 0;
        this.score = 0;
        this.time = time;
    }


    setAmount(cantidad){
        this.currentAmount = cantidad;
    }
    Winner (){
        return this.currentAmount == this.objectAmount;
    }
    Score(){
        return this.score
    }

    StartTimer(){
        var timedEvent = this.create.time.delayedCall(1000, this.onEvent, [], this);
    }

    YouLose(){
        return this.time <= 0;
    }

    onEvent(){
        this.time -=1;
        if (this.time > 0){
            this.StartTimer();
        }


    }



}






