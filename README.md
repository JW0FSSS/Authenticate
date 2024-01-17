routes:

    register:
        '/singUp'=> require: {email,password,name}
    
    login:
        '/account' => require: {data:{password,email}} ; return => jsonwebtoken 
        '/account/profile' => require: jsonwebtoken in bearer
        '/account/email'=> require: {newEmail} and jsonwebtoken in bearer
        '/account/password'=> require: {oldPassword, newPassword} and jsonwebtoken in bearer
        '/account/name'=> require: {newName} and jsonwebtoken in bearer
        '/account/delete'=> require: {password} and jsonwebtoken in bearer