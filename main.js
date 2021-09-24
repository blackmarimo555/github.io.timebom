'use strict';
{
    class Timebom{
        constructor(){
            this.playerNumber = 4;
            this.playerName = [];
            this.turn = 1;
            this.card = [];
            this.playerCard = [];
            this.currentNumber = 0;
            this.playerDirector = [];
            this.nipper = 0;
            this.checkeCardNumber = 0;
            this.successNumber = 0;
            this.pullCard = 0;
            this.gameNumber = 0;
            this.swatWinNumber = 0;
            this.terroristWinNumber = 0;
            this.playersWin = [0,0,0,0];

            this.start();
        }

        start(){
            document.getElementById('start-btn').addEventListener('click',()=>{
                document.getElementById('top').classList.add('hidden');
                this.nameIn();
            });

        }
        nameIn(){
            const settingPage = document.getElementById('setting');
            settingPage.classList.remove('hidden');
            document.getElementById('nameend').addEventListener('click',(e)=>{
                e.preventDefault();
                for(let i =0;i<this.playerNumber;i++){
                    const text = document.querySelectorAll('input')[i];
                    this.playerName[i] = text.value;
                }
                settingPage.classList.add('hidden');
                this.gameRun();
            });
        }
        gameRun(){
            if(this.turn === 1){
                this.settingGame();
            }
            this.saffleCard(this.card);
            for(let i = 0; i< this.playerNumber; i++){
                this.playerCard[i] = this.card.splice(0,6 - this.turn);
            }
            this.checkeCardNumber = 0;
            if(this.nipper === 3){
                this.currentNumber = 0
            }else{
                this.currentNumber = this.nipper+1;
            }
            this.checkeCard(this.currentNumber);
        }
        settingGame(){
            this.card = [2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            const director = [0,0,0,1,1];
            this.saffleCard(director);
            for(let i = 0; i < this.playerNumber;i++){
                this.playerDirector[i] = director[i];
            }
            this.nipper = Math.floor(Math.random() * 4);
        }
        saffleCard(array){
            for(let i = (array.length - 1); 0 < i; i--){

                // 0〜(i+1)の範囲で値を取得
                let r = Math.floor(Math.random() * (i + 1));
            
                // 要素の並び替えを実行
                let tmp = array[i];
                array[i] = array[r];
                array[r] = tmp;
              }
        }
        checkeCard(i){
            if(i === this.playerNumber){
                return;//kari
            }
            const tab = document.createElement('div');
            tab.classList.add('tab');
            tab.innerText = `${this.playerName[i]}さん用の確認画面です。${this.playerName[i]}さんに端末を渡してください\n\n\n\n\n\n\n\n\n\n\n\n`;
            const btn = document.createElement('div');
            btn.classList.add('btn');
            btn.innerText = `確認する`;
            tab.appendChild(btn);
            document.querySelector('body').appendChild(tab);
            btn.addEventListener('click',()=>{
                this.confirmPlayar();
            });
        }
        confirmPlayar(){
            const confirmTab = document.createElement('div');
            confirmTab.classList.add('confirmTab');
            const p = document.createElement('p');
            p.innerText = '役職と手札を表示します\nよろしいですか？\n\n\n\n\n'
            confirmTab.appendChild(p);
            const container = document.createElement('div');
            const cancelBtn = document.createElement('div');
            const okBtn = document.createElement('div');
            cancelBtn.innerText = 'キャンセル';
            okBtn.innerText = 'OK';
            container.appendChild(cancelBtn);
            container.appendChild(okBtn);
            confirmTab.appendChild(container);
            document.body.appendChild(confirmTab);
            cancelBtn.addEventListener('click',()=>{
                confirmTab.remove();
            });
            okBtn.addEventListener('click',()=>{
                confirmTab.remove();
                const tab = document.getElementsByClassName('tab')[1];
                tab.remove();
                this.viewCard(this.currentNumber);
            });
        }
        viewCard(i){
            const tab = document.createElement('div');
            document.body.appendChild(tab);
            tab.classList.add('tab');
            const p1 = document.createElement('p');
            p1.innerText = `${this.playerName[i]}さんの役職は`;
            const director = document.createElement('img');
            if(this.playerDirector[i]===0){
                director.src = 'img/swat.png';
            }else{
                director.src = 'img/terrorist.png';
            }
            tab.appendChild(p1);
            tab.appendChild(director);
            const p2 = document.createElement('p');
            p2.innerText = `${this.playerName[i]}さんの${this.turn}フェイズ目の手札は`;
            tab.appendChild(p2);
            for(let y=0;y<6-this.turn;y++){
                const img = document.createElement('img');
                img.classList.add('cardWidth');
                if(this.playerCard[i][y] === 0){
                    img.src='img/safe.png';
                }else if(this.playerCard[i][y] === 1){
                    img.src='img/success.png';
                }else if(this.playerCard[i][y] === 2){
                    img.src='img/bom.png';
                }
                tab.appendChild(img);
            }
            const btn = document.createElement('div');
            btn.classList.add('btn');
            btn.innerText = '確認';
            tab.appendChild(btn);
            btn.addEventListener('click',()=>{
                tab.remove();
                this.saffleCard(this.playerCard[i]);
                this.checkeCardNumber++;
                this.currentNumber++;
                if(this.currentNumber === this.playerNumber){
                    this.currentNumber=0;
                }
                if(this.checkeCardNumber === this.playerNumber){
                    this.startConfirm();
                }else{
                    this.checkeCard(this.currentNumber);
                }
            });
        }
        startConfirm(){
            const tab = document.createElement('div');
            tab.innerText = '[議論開始]を押すとゲームが開始されます。\n端末を全プレイヤーが見える場所に置いて[議論開始]を押してください';
            const btn = document.createElement('div');
            btn.innerText = '議論開始';
            tab.appendChild(btn);
            document.body.appendChild(tab);
            btn.classList.add('btn');
            tab.classList.add('tab');
            btn.addEventListener('click',()=>{
                tab.remove();
                this.mainGame();
            });


        }
        mainGame(){
            const tab = document.createElement('div');
            document.body.appendChild(tab);
            let n = this.nipper;
            for(let i = 0; i<3;i++){
                n++;
                if(n===this.playerNumber){
                    n=0;
                }
                const m = n;
                const tab2 = document.createElement('div');
                tab2.innerText = `${this.playerName[n]}\n`;
                this.playerCard[n].forEach((v,u)=>{
                    
                    const j = u;
                    const img = document.createElement('img');
                    img.src = 'img/card.png';
                    tab2.appendChild(img);
                    img.addEventListener('click',()=>{
                        const confirmTab = document.createElement('div');
                        confirmTab.classList.add('confirmTab');
                        const p = document.createElement('p');
                        p.innerText = `${this.playerName[m]}さんのカードを引きます。よろしいですか？\n\n\n\n\n`
                        confirmTab.appendChild(p);
                        const container = document.createElement('div');
                        const cancelBtn = document.createElement('div');
                        const okBtn = document.createElement('div');
                        cancelBtn.innerText = 'キャンセル';
                        okBtn.innerText = 'OK';
                        container.appendChild(cancelBtn);
                        container.appendChild(okBtn);
                        confirmTab.appendChild(container);
                        document.body.appendChild(confirmTab);
                        cancelBtn.addEventListener('click',()=>{
                            confirmTab.remove();
                        });
                        okBtn.addEventListener('click',()=>{
                            confirmTab.remove();
                            tab.remove();                 
                            this.openCard(m,j);
                        });

                    });
                });
                tab2.classList.add('tab2');
                tab.appendChild(tab2);
            }
            const p = document.createElement('p');
            p.innerText = `${this.playerName[this.nipper]}さんのターンです。引きたいカードをタップしてください`;
            const p2 = document.createElement('p');
            p2.innerText = `現在のフェイズ : ${this.turn}/4\nこのフェイズに引いた回数 : ${this.pullCard}/4\nSUCCESS : ${this.successNumber}/4`;
            tab.appendChild(p);
            tab.appendChild(p2);
        }
        openCard(m,v){
            console.log(this.playerCard[m]);
            console.log(this.playerCard[m][v]);
            const tab = document.createElement('div');
            const img = document.createElement('img');
            tab.classList.add('tab3');
            tab.appendChild(img);
            document.body.appendChild(tab);
            const p = document.createElement('p');
            p.innerText = 'カードをタップでオープン';
            tab.appendChild(p);
            img.src = 'img/card.png';
            let f=0;
            img.addEventListener('click',e=>{
                if(f===1){
                    return;
                }
                f=1;
                tab.classList.add('opa');
                setTimeout(()=>{
                    tab.classList.remove('opa');
                    if(this.playerCard[m][v] === 0){
                        img.src = 'img/safe.png';
                    }else if(this.playerCard[m][v] === 1){
                        img.src = 'img/success.png';
                    }else{
                        img.src = 'img/bom.png';
                    }
                    const btn = document.createElement('div');
                    btn.classList.add('btn');
                    btn.innerText = '次へ';
                    tab.appendChild(btn);
                    btn.addEventListener('click',()=>{
                        tab.remove();
                        if(this.playerCard[m][v] === 1){
                            this.successNumber++;
                        }
                        this.pullCard++;
                        this.nipper = m;
                        if(this.playerCard[m][v]===2){
                            this.gameresolt(1);
                            return;
                        }
                        if(this.successNumber === 4){
                            this.gameresolt(0);
                            return;
                        }
                        this.playerCard[m].splice(v,1);
                        if(this.pullCard === 4){
                            this.turn++;
                            if(this.turn ===5){
                                this.gameresolt(1);
                                return;
                            }
                            this.pullCard = 0;
                            const tab2 = document.createElement('div');
                            tab2.innerText =`第${this.turn-1}フェイズは終了しました。\n手札をシャッフルします。\n各プレイヤーは再度手札の確認をしてください。`;
                            document.body.appendChild(tab2);
                            tab2.classList.add('tab4');
                            const btn = document.createElement('div');
                            btn.innerText = '次へ';
                            btn.classList.add('btn');
                            tab2.appendChild(btn);
                            btn.addEventListener('click',()=>{
                                tab2.remove();
                                this.reloadCard();
                            });
                        }else{
                            this.mainGame();
                        }
                    });
                },1000);
            });

        }
        reloadCard(){
            for(let i = 0;i < this.playerNumber;i++){
                const d = this.playerCard[i].splice(0,this.playerCard[i].length);
                this.card = this.card.concat(d);
            }
            this.gameRun();

        }
        gameresolt(resolt){
            this.gameNumber++;
            const tab = document.createElement('div');
            tab.classList.add('tab4');
            const p = document.createElement('p');
            tab.appendChild(p);
            p.classList.add('bigFont');
            document.body.appendChild(tab);
            if(resolt === 0){
                p.innerText = 'SWAT陣営の勝利!';
                this.swatWinNumber++;
                for(let i = 0;i<this.playerNumber;i++){
                    if(this.playerDirector[i] === 0){
                        this.playersWin[i]++;
                    }
                }
            }else{
                p.innerText = 'TERRORIST陣営の勝利!';
                this.terroristWinNumber++;
                for(let i = 0;i<this.playerNumber;i++){
                    if(this.playerDirector[i] === 1){
                        this.playersWin[i]++;
                    }
                }
            }
            const p2 = document.createElement('p');
            p2.innerText = 'winner';
            tab.appendChild(p2);
            for(let i =0 ; i < this.playerNumber; i++){
                if(this.playerDirector[i] === resolt){
                    const p3 = document.createElement('p');
                    p3.innerText = `${this.playerName[i]}:勝率${this.playersWin[i]}/${this.gameNumber}`;
                    tab.appendChild(p3);
                }
            }
            const p4 = document.createElement('p');
            p4.innerText = 'loser';
            tab.appendChild(p4);
            for(let i =0 ; i < this.playerNumber; i++){
                if(this.playerDirector[i] !== resolt){
                    const p3 = document.createElement('p');
                    p3.innerText = `${this.playerName[i]}:勝率${this.playersWin[i]}/${this.gameNumber}`;
                    tab.appendChild(p3);
                }
            }
            const p5 = document.createElement('p');
            tab.appendChild(p5);
            p5.innerText = `SWAT陣営の勝率 : ${this.swatWinNumber}/${this.gameNumber}\nTERRORIST陣営の勝率 : ${this.terroristWinNumber}/${this.gameNumber}`;
            const btn = document.createElement('div');
            btn.classList.add('btn');
            btn.innerText = '次のゲームへ';
            tab.appendChild(btn);
            btn.addEventListener('click',()=>{
                this.turn = 1;
                this.successNumber = 0;
                this.pullCard = 0;
                tab.remove();
                this.gameRun();
            });
        }
    }

    const timebom = new Timebom();
}