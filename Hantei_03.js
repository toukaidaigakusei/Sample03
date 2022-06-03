//***********************************************
//文字コードを判定する
//GitHubを参考した行は、9～32

function MHantei(){
    let Text = document.getElementById('textbox');
    let TV = Text.value; //テキストボックスの文字を取得

    const UA = Encoding.stringToCode(TV); // 文字列から文字コード値(Unicode)の配列に変換
    //console.log(UA); //Unicode表示用
    let mua = Encoding.codeToString(UA); //文字コード値から文字列に戻す

    const SA = Encoding.convert(UA, { //UnicodeからShift_JISに変換
        to: 'SJIS',
        from: 'UNICODE'
    });
    //console.log(SA); 
    let msa = Encoding.codeToString(SA); 

    const JA = Encoding.convert(UA, { //UnicodeからISO-2022-JPに変換
        to: 'JIS',
        from: 'UNICODE'
    });
    //console.log(JA);
    let mja = Encoding.codeToString(JA); 

    const EA = Encoding.convert(UA, { //UnicodeからEUCに変換
        to: 'EUCJP',
        from: 'UNICODE'
    });
    //console.log(EA);
    let mea = Encoding.codeToString(EA); 

    if(TV == ""){
        alert("テキストが入力されていません");
    }
    else if(TV == mua){
        alert("文字コードはUnicode");
    }
    else if(TV == msa){
        alert("文字コードはShift-JIS");
    }
    else if(TV == mja){
        alert("文字コードはISO-2022-JP");
    }
    else if(TV == mea){
        alert("文字コードはEUC");
    }
    else{
        alert("テキストの文字列は判別対象の文字コードを使用していません");
    }

    //************************************************* 
    //以下は自分で考えたコードです。テキストのUnicodeを求める所まで出来ました
    /*
    let M = [];
    M = Array.from(TV); //文字列を１文字ずつ配列に格納
    for(let i = 0; i < M.length; i++){
        let c = M[i]; //仮保存する
        M[i] = c.charCodeAt(); //Unicodeを返す。toString(2)でバイナリを返す事もできる
    }
    console.log(M); 
    */
}

//************************************************ 
//文字コードの変換
function MHenkan(){
    let Text = document.getElementById('textbox');
    let TV = Text.value; //テキストボックスの文字を取得

    const UA = Encoding.stringToCode(TV); // 文字列から文字コード値(Unicode)の配列に変換
    //console.log(UA); //Unicode表示用
    if(Moji.value == "ISO-2022-JP"){
        const JA = Encoding.convert(UA, { //UnicodeからISO-2022-JPに変換
            to: 'JIS',
            from: 'UNICODE'
        });
        //console.log(JA);
        let jastr = Encoding.codeToString(JA); // 文字コード値の配列から文字列に変換
        console.log(jastr);
    }
    else if(Moji.value == "Shift JIS"){
        const SA = Encoding.convert(UA, { //UnicodeからShift_JISに変換
            to: 'SJIS',
            from: 'UNICODE'
        });
        //console.log(SA); 
        let sastr = Encoding.codeToString(SA); 
        console.log(sastr);
    }
    else if(Moji.value == "EUC"){
        const EA = Encoding.convert(UA, { //UnicodeからEUCに変換
            to: 'EUCJP',
            from: 'UNICODE'
        });
        //console.log(EA);
        let eastr = Encoding.codeToString(EA); 
        console.log(eastr);
    }
    else if(Moji.value == "Unicode"){
        let mua = Encoding.codeToString(UA); 
        console.log(mua);
    }
}

//***************************************************
//改行コードの判別を行う
function KHantei(){
    let Text = document.getElementById('textbox');
    let Value = Text.value;

    if(Value.indexOf("\r\n")>-1){
        alert("改行コードはCRLFです");
    }
    else if(Value.indexOf("\n")>-1){
        alert("改行コードはLFです");
    }
    else if(Value.indexOf("\r")>-1){
        alert("改行コードはCRです");
    }
}

//*************************************************** 
//改行コード変換
function Henkan(){
    let Text = document.getElementById('textbox');
    let Value = Text.value;
    let K = document.getElementById('Kaigyou');
    let KK = K.value;

    if(Value.indexOf("\r\n")>-1){
        if(KK == "CR"){
            alert("改行コードはCRLFですが、CRに変換します");
            console.log(Value.replace('\r\n','\r'));
        }
        else if(KK == "LF"){
            alert("改行コードはCRLFですが、LFに変換します");
            console.log(Value.replace('\r\n','\n'));
        }
        else{
            console.log("使用されている改行コードと選択した改行コードが同一です");
        }
    }
    else if(Value.indexOf("\n")>-1){
        if(KK == "CR"){
            alert("改行コードはLFですが、CRに変換します");
            console.log(Value.replace('\n','\r'));
        }
        else if(KK == "CRLF"){
            alert("改行コードはLFですが、CRLFに変換します");
            console.log(Value.replace('\n','\r\n'));
        }
        else{
            console.log("使用されている改行コードと選択した改行コードが同一です");
        }
    }
    else if(Value.indexOf("\r")>-1){
        if(KK == "LF"){
            alert("改行コードはCRですが、LFに変換します");
            console.log(Value.replace('\r','\n'));
        }
        else if(KK == "CRLF"){
            alert("改行コードはCRですが、CRLFに変換します");
            console.log(Value.replace('\r','\r\n'));
        }
        else{
            console.log("使用されている改行コードと選択した改行コードが同一です");
        }
    }
}

//**************************************************** 
//文字の種別を判定する
//パターンは「全角・半角」の「文字列・数値」かの４種類
function SHantei(){
    let Text = document.getElementById('textbox');
    let Value = Text.value;
    document.getElementById("Syurui").style.color = "red";

    if(Value == ""){ //テキストに何も入力されていない時に出力される
        printMsg("テキストには何も入力されていません");
    }
    else if(Value.match(/^[^\x01-\x7E\xA1-\xDF]+$/)){
        if(!isNaN(Value)){
            printMsg("テキストには全角文字の数値が入力されています");
        } 
        else if(Value.match(/^[０-９]*$/)){
            printMsg("テキストには全角文字の数値が入力されています");
        }
        else {
            printMsg("テキストには全角文字の文字列が入力されています");
        }
    }
    else{
        if(!isNaN(Value)){
            printMsg("テキストには半角文字の数値が入力されています");
        } 
        else if(Value.match(/^[０-９]*$/)){
            printMsg("テキストには半角文字の数値が入力されています");
        }
        else {
            printMsg("テキストには半角文字の文字列が入力されています");
        }
    }
}

//*********************************************************************** 
//画面表示用
function printMsg(syurui){
    document.getElementById("Syurui").innerHTML = syurui;
}
