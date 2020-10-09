function myfunction()
{


var sender=document.getElementById("dropdowndemo");
var sender=sender.value;
var receiver=document.getElementById("receiver_dropdown");
var receiver=receiver.value;
var amountv=document.getElementById("Amount");
var amountv= amountv.value;
var sender_balance=document.getElementById("first_money");
var sender_balance=sender_balance.innerText;
var sender_balance =sender_balance.match(/\d/g);
sender_balance = sender_balance .join("");
sender_balance=parseInt(sender_balance);
//var Account_nov=docum ent.getElementById("no");
//var Account_nov= Account_nov.value;
var rname=sender;
var ramount=parseInt(amountv);
//var rAccount_no=Account_nov;
//console.log(rAccount_no);
//console.log(rAccount_no.length);
if(ramount>sender_balance)
{
	alert("balance is low");
	return false;
}
if(sender=="name")
{
alert("enter correct info");
//document.forms[0].user.focus();
}
if(ramount<1000)
{
	alert("amount should be greater than 1000");
	//document.forms[0].user.focus();
	return false;
}
/*if(rAccount_no.length<10)
{
	alert("invalid account no");
	document.forms[0].user.focus();
}*/
if(rname&&ramount)
{
alert("All values are valid");
$.ajax({
			url:'money_transfer',
			method:'post',
			data:JSON.stringify({'sender':sender,'receiver':receiver,'amount':amountv}),
			datatype:'JSON',
			contentType: "application/json",
			success:function(response){
				console.log(response);
				alert("Transferred Successfully!!!!")
				$("#first_money").html("Rs:"+response['sender_amount']);
				$("#receiver_money").html("Rs:"+response['receiver_amount']);
			},
			error:function(response){
			alert("Issue Please contact Admin");
			}
		})
}
}

function checkclick(){ 

var clicked = document.getElementById("checkbox");
clicked = clicked.checked;
if (clicked){
console.log("checked");
window.location.href = "transfer";
}
else{
alert("Please check the TickBox!")}
}
