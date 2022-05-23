window.addEventListener('load', (event) => {

    const canvas = document.getElementById("canvas");
    
    const ctx = canvas.getContext('2d');
    const interval = 100;
    const square = Math.round(canvas.width / interval);

       // batman position 
       let batman = {
        x:Math.ceil(Math.random()*interval-1),
        y:Math.ceil(Math.random()*interval-1)
    }

    let target = Object.assign({}, batman);


    while(target.x==batman.x && target.y==batman.y)
    {
        target.x =Math.ceil(Math.random()*interval-1);
        target.y = Math.ceil(Math.random()*interval-1);
    }


    const getDirection = () => {
        let direction = "";

        if (batman.y - target.y > 0) {
            direction = "U"
        }

        if (batman.y - target.y < 0) {
            direction = "D"
        }

        if (batman.x - target.x > 0) {
            direction += "L"
        }

        if (batman.x - target.x < 0) {
            direction += "R"
        }
        return direction;
    }
    const nextFrame = () => {

        const pos = getDirection().split('');

        pos.forEach(element => {

            console.log(element);
            goto(element);
            // if(!onTarget())goto(element);
        });

        batman.x = X;
        batman.y = Y;
        
        console.log('x' , X, 'y' , Y, onTarget());
        console.log('top' , top, 'right' , right,  'bottom' , bottom , 'left', left);
        console.log('GRID ' , bottom- top, ' X ' , right - left);
        
        
       
        draw();


        if (target.x == batman.x && target.y == batman.y) {
            clearInterval(id);
            console.log("success");
            alert("you win");
        }

        //////////////////////
        if (max <= 0) {
            clearInterval(id);
            alert("you lose");
        }
        max--;
    }

    let max = 25;

    let id;
    let X = batman.x;
    let Y = batman.y;
    let top = 0;
    let right = interval;
    let bottom = interval;
    let left = 0;
    console.log('batman' ,batman.x , batman.y);
    console.log('target', target.x , target.y);
    console.log(`GRID ${interval}x${interval}`);
    id = setInterval(nextFrame, 2000);
    // document.getElementById("btn").addEventListener('click', nextFrame);


    const onTarget= ()=>
    {
        return batman.x < right && batman.x > left && batman.y < bottom && batman.y > top;
                
    }

    const goto =(direction)=>{

        switch (direction) {
            case 'U':
                bottom = Y;
                Y = Math.ceil((Y+top)/2);
            break;
            case 'D':
                top = Y;
                Y += Math.ceil((bottom-Y)/2);
                break;
            case 'L':
                right = X;
                X = Math.ceil((X+left) / 2);

                break;
            case 'R':
                left = X;
                X += Math.ceil((right - X) / 2);
                break;
        }
    }


    const draw = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgb(200, 0, 0)';
        for (let y = 0; y < interval; y++) {
            for (let x = 0; x < interval; x++) {
                ctx.strokeRect(square * x, square * y, square, square);
            }
        };


        // draw zone

        ctx.fillStyle = 'rgba(200, 200, 200, .25)';
        for (let y = top; y < bottom; y++) {
            for (let x = left; x < right; x++) {
                ctx.strokeRect(square * x, square * y, square, square);
            }
        };


        // display batman
        ctx.fillStyle = "white";
        ctx.fillRect(square * batman.x, square * batman.y, square, square);

        // display target
        ctx.fillStyle = "blue";
        ctx.fillRect(square * target.x, square * target.y, square, square);
    }

    draw();

});