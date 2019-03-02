(function init() {
    var quotes = {};

    var socket = io.connect(socketUrl);

    socket.on('connect', function () {

        console.log('socket connected')

        socket.emit('subscribe', ['AAPL', 'GOOG', 'MSFT', 'FB', 'YHOO', 'LNKD', 'ZNGA', 'ORCL'], function (data) {

            quotes = data;

            console.log('subscribe', data)
        });


    });



    socket.on('quoteReceived', function (data) {

        quotes[data.symbol] = data;

        if(!document.getElementById("symbol-item-"+data.symbol)){
            var el = document.getElementById("symbol-item-placeholder");
            el = el.cloneNode(true);
            el.id = "symbol-item-"+data.symbol;
            el.style.display="block";
            document.getElementById("placeholder").appendChild(el);
        }

        el = document.getElementById("symbol-item-"+data.symbol);
        if(data.dailyChange >=0){
            el.classList.remove('quote-trend-down');
            el.classList.add('quote-trend-up')
        }else {
            el.classList.remove('quote-trend-up');

            el.classList.add('quote-trend-down');
        }

        el.querySelector(".quote-price").innerHTML = data.lastPrice;
        el.querySelector(".quote-volume span").innerHTML = data.volume;
        el.querySelector(".quote-title").innerHTML = data.symbol;
        el.querySelector(".quote-change").innerHTML = (data.dailyChange > 0 ? '+': ' ')+ data.dailyChange +' ' + data.dailyChangePercent+'%';
        el.querySelector(".quote-date").innerHTML = new Date(data.lastDate).toDateString() +" " +new Date(data.lastDate).toTimeString();



        console.log('socket', data);

    });

})();
