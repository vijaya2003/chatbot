const request = require('request');
const TelegramBot = require('node-telegram-bot-api');
const token = '5369010063:AAGIHpfpYyA6m8Uk3H0fPQgJww67a070F68';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', function(mg){
    request('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita',function(error,response,body){
         let da=JSON.parse(body);
            let a = 0;
            for (let i=0 ;i<da.drinks.length;i++){
                if((da.drinks[i].idDrink).toLowerCase()==(mg.text).toLowerCase()){
                    a=a+1;
                    bot.sendMessage(mg.chat.id,"The ID of the drink is :: "+da.drinks[i].idDrink);
                    bot.sendMessage(mg.chat.id,"The category of the drink :: "+da.drinks[i].strCategory);
                    bot.sendMessage(mg.chat.id,da.drinks[i].strTags);
                    bot.sendMessage(mg.chat.id,da.drinks[i].strIBA);
                    bot.sendMessage(mg.chat.id,da.drinks[i].strDrink);
                }
            }
            if(a==0){
                bot.sendMessage(mg.chat.id,"Item not Found");
            }
    
    });
})
