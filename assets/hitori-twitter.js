$(function() {
    // 初期描画
    var tweetArray = [];
    tweetDraw();
    // ツイート入力欄にフォーカスがあたったときの振る舞い
    $("#form textarea").click(function() {
            $(this).addClass("focus");
            $("#form input").show();
        })
        // ツイート送信
    $(document).on("submit", "#form", function() {
            // ツイートの取得
            var tweetText = $("#form textarea").val();
            $("#form textarea").val("");
            // ローカルストレージにツイートを追加
            tweetArray.push(tweetText);
            var saveTweet = JSON.stringify(tweetArray);
            localStorage.setItem("tweetsJson", saveTweet);
            // ツイートを描画
            tweetDraw();
            return false;
        })
        // ツイートをすべて削除
    $("#resetBtn").click(function() {
        if (window.confirm('メモをすべて削除しますか？')) {
            localStorage.removeItem("tweetsJson");
            tweetArray = [];
            tweetDraw();
        }
    })

    // ツイート描画の関数
    function tweetDraw() {
        var tweetHtml = "";
        var tweet = localStorage.getItem("tweetsJson");
        if (tweet) {
            tweetArray = JSON.parse(tweet);
        }
        if (tweetArray.length > 0) {
            var i = tweetArray.length - 1;
            tweetArray.forEach(function() {
                console.log(tweetArray[i]);
                tweetHtml += '<div class="stream-item"><div class="stream-item-header"><img src="assets/img/profile.jpg" width="48" height="48"><a href= "https://help.twitter.com/ja/managing-your-account/about-twitter-verified-accounts" target="_blank" alt="認証済み"> <img src="assets/img/thx.png" width="17" height="17"> </a><span class="full-name">メモくん</span><span class="user-name">@Ar</span></div><div class="tweet-text">' + tweetArray[i] + '</div></div>';
                i--;
            });
            $(".stream").html(tweetHtml);
        } else {
            $(".stream").html("<div class='no-tweet'>メモ0件</div>");
        }
    }
})