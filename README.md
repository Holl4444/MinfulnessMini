# MinfulnessMini
ELevate your mood

## Contents
* [Overview](#overview)
* [Screenshots](#screenshots)
* [Links](#links)
* [Process](#the-process)
* [Built With](#built-with)
* [What I learnt](#what-i-learnt)
* [Continued development](#continued-development)

## Overview
MVP: To create a restful API where you can fetch uplifting quotes to mirror or elevate your mood. Add those you find inspirational and store them in the approriate section.

### Screenshots

### Links
Article on conflicting routes in express:</br>
https://medium.com/@gilbertandanje/managing-path-parameters-in-express-js-avoiding-route-conflicts-d9f5eefe8e68

### The Process
Beginning with Disney Ideation to channel and refine ideas. The plan was still pretty loose going into the first MVP as I wanted to be certain I didn't bite off more than I could chew!
Make a restful API capable of serving up quotes.

![image](https://github.com/user-attachments/assets/098ffe3d-a43f-43d9-9f0d-8336ad7b2602)

Looking around for a free API I first came across https://zenquotes.io/ which seemed perfect but required a paid key to access keyword searches. I decided to download a dataset to keep things simple and found a nice set of quotes with keywords on Kaggle. 
Even better it was already in JSON and didnt need formatting.

Remembering how to make the server was more of a struggle than I anticipated. It's amazing what a week and a lot of Christmas pudding will do to you. It did mean though that I got some good practice googling about and even running my plans past chatGPT when I got frustrated. Adding error handling was new for me and somewhat overwhelming as there seem to be many different ways to do it. I mostly went with wrapping try catches around the juicy bits of functions but discovered that there is a lot more to learn about possible problems with ports and I'll have to do a deep dive there sometime as it seemed really interesting.<br/><br/>


![image](https://github.com/user-attachments/assets/ca056c84-0a57-4517-ba8d-4f3d95086286)

I needed to implement a DELETE request function earlier than I had anticipated as the data had repeated quotes. It was an enjoyable challenge to figure out how to do this. I looked through quite a bit of documentation for ways of managing arrays including .filter, .splice, indexOf and map! I finally settled on set() and discovered its friend .has!
I missed out a couple of 'awaits' in my first attempt and it took me a while to reason out that the empty object the response body was returning was actually a promise object!

I was adding more and more error handlers and began to wonder if I was overdoing it: checking for errors in functions that were working with data coming from functions I had previously checked! I decided that not only is safe better than sorry but also I was getting good practice in.

As I tried to add the ability to get an individual quote chosen at random I encountered a problem: the response was returning multiple quotes, even though I had tested my random index picking function. Poking around in the results I realised that the quotes were being selected using random as a keyword. Luckily another bootcamper had highlighted route conflicts and given a handy link to an article on handling them! Moving things around fixed my problem. As I have both a get request to select individual quote from all matching keywords and one to select an individual quote from the entire array, order was important. ```'/quotes/:keyword/random'``` had to come before ```'/quotes/random'```, which in turn had to come before ```'/quotes/:keyword'```! The take away from all this? Plan better!

![image](https://github.com/user-attachments/assets/9ad5130f-36a8-4d03-8bcd-8ae5e6ba87a6)



### Built with
- javaScript
- NodeJs
- Express

## What I learnt

## Continued Development


