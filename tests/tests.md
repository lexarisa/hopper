# backend  
## User model / controller
1. 
- leave user name empty  
- submit form  
- expect Required on page  
2. 
- create user  
- new user adds existing username  
- submit form  
- expect Please use a different username  
3. 
- create user  
- login with wrong credentials  
- submit form  
- expect Invalid Credentials on page  

## joinCommunity  
1. 
- member in community  
- assert response 200  
- assert res message = already a member  
2. 
- member not in community  
- assert response 201  
- assert member is sent as body  

# Front end
## Form tests  
1. 
- leave user name empty  
- submit form  
- expect Required on page  
2. 
- create user  
- new user adds existing username  
- submit form  
- expect Please use a different username  
3. 
- create user  
- login with wrong credentials  
- submit form  
- expect Invalid Credentials on page  
4. 
- create user  
- submit form  
- expect discover your new remote working location on page  
- login with right credentials  

## chat Tests  
1. 
- client 1 join community  
- client 1 add message to community  
- client joins chat communit  
- see client 1 message  
- add message  
- see message added  
- client 2 sees message added  

## City detail  
1. 
- create mock data of cities and mock city detail data  
- from home page click stockholm  
- assert average monthly salary on page  
- assert join the community on page  
- assert stocholm on page  
- assert paris not on page  
2. 
- from home page click paris  
- assert average monthly salary on page  
- assert join the community on page  
- assert paris on page  
- assert stockholm not on page  

## profile tests  
- join Paris, France community  
- join stockholm, sweden community  
- click profile  
- assert your communities on page  
- assert paris france on page  
- assert stockholm on page  
- assert parma not on page  
2. 
- join community  
- click community  
- send message "Hello World!"  
- click back  
- assert hello world on page  
3. 
- click logout  
- assert login on page  
- assert Discover your new remote working community on page  

## home page tests  
### create mock data of cities  
### create mock api request  
1. 
- non logged in user load home page  
- assert city on page?  
- assert login button on page  
- assert profile not on page  
2. 
- logged in user load home page  
- assert city on page?  
- assert profile on page  
- assert explore on page  
3. 
- input par into search field  
- assert paris, france on page  
- assert parma, italy on page  
- assert paramaribo, suriname on page  
- assert Stockholm, not on page  
4.
- input pari into search field  
- assert parma, italy not on page  
- assert paris, france on page  
5. 
- click profile  
- assert your communities on page  