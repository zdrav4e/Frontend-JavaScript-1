$(function() {
    console.log("I AM READY");
    window.socket = new io("http://localhost:3000");
    var socketId = null;
    window.gameId = null;

socket.on("connect", function(data) {
    socketId = socket.io.engine.id;
    runAfterSocketHasConnected();
});

socket.on("start", function(data) {
    console.log(data);
    window.hostsnake = new Snake(data.player1, 100, 10, "red", context);
    window.guestsnake = new Snake(data.player2, 100, 60, "blue", context);

    window.hostfood = new Food(data.player1, 10, 80, context);
    window.guestfood = new Food(data.player2, 50, 50, context);

    gamestart();
});

socket.on("render", function(data) {
    console.log("Should render now");
    console.log(data);

    //data.hostsnake.print();
    var newTile = new Tile(data.newTile.x, data.newTile.y, tileWidth, context);

    var snaketomove = hostsnake.getName() === data.playerName ? hostsnake : guestsnake;

    snaketomove.tiles.unshift(newTile);
    snaketomove.tiles.pop();

    console.log(snaketomove);
});

function runAfterSocketHasConnected() {
    $("#createGame").on("click", function() {
        $.ajax({
            url: "http://localhost:3000/createGame",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                playerName: $("#playerName").val(),
                socketId: socketId
            })
        }).done(function(result) {
            gameId = result.gameId;
            console.log("Game is created with id: ", gameId);
        });
    });

    $("#joinGame").on("click", function() {
        gameId = $("#joinGameId").val();
        $.ajax({
            url: "http://localhost:3000/joinGame",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                playerName: $("#playerName").val(),
                socketId: socketId,
                gameId: gameId
            })
        }).done(function(result) {
            //gamestart();
        });
    });
}
});
