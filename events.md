# type: message 
# cmd: (chat, info, warn, onlineSet, onlineAdd, onlineRemove)
# < Types of cmd >
## info
/whisper
> {"cmd":"info","type":"whisper","from":"ltp","trip":"LtPGv4","utype":"user","text":"ltp whispered: you suck, bitch","time":1582861139131}
* There is also another type of info called "System".
## chat 
when someone sends a message
> {"cmd":"chat","nick":"ltp","text":"fuck","trip":"LtPGv4","time":1582860868222}
## onlineAdd 
when someone joins.
> {"cmd":"onlineAdd","nick":"ltp","trip":"LtPGv4","hash":"gUZBWlOYTooUJUm","time":1582860891409}
## onlineRemove 
when someone leaves.
> {"cmd":"onlineRemove","nick":"ltp","time":1582860888261}
## warn 
nick name taken or retry
> {"cmd":"warn","text":"Nickname taken","time":1582861503365}