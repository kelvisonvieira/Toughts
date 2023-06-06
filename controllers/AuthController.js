
const User = require('../models/User')

const bcrypt= require('bcryptjs')

module.exports = class AuthController{
    static login(req,res){
        res.render('auth/login')
    }
    static register(req,res){
    res.render('auth/register')
    }

    static async registerPost(req, res){
   const { name, email, password,confirmpassword
    } = req.body

    //password match validation
    if( password != confirmpassword){
        req.flash('message','As senhas não conferem, tente novamente!')
        res.render('auth/register')
        return
        }
     const checkUserExists = await User.findOne({where: {email: email}}) 
     if(checkUserExists){
        req.flash('message','O email já está em uso')
        res.render('auth/register')
        return
     }   
     //create a password
     const salt= bcrypt.genSaltSync(10)
     const hashedPassword = bcrypt.hashSync(password,salt)
     const user ={
         name,
        email,
        password: hashedPassword
     }
     try{
      const createUser= await User.create(user)
      req.session.userid=createUser
       req.flash('message','cadastro realizado com sucesso!')
       req.session.save(()=>{
        res.redirect('/')
    
       })

     } catch(err){
     console.log(err)
     }
    }

    static async logout(req,res){
        req.session.destroy()
        res.redirect('/login')
    }
    static async loginPost(req,res){
      const email= req.body.email 
      const password = req.body.password
     const emailData = await User.findOne({where:{email:email}})
     if(!emailData){
        req.flash('message','Email não existe!')
        res.redirect('/login')
        return
     }
     const passwordMatch =bcrypt.compareSync(password,emailData.password)
    
     if(!passwordMatch){
      
            req.flash('message','senha inválida')
            res.redirect('/login')
       
            return
         
     }
   
     req.session.userid=emailData.id
     req.flash('message', 'Login realizado com sucesso')
     console.log(emailData.id)
     req.session.save(()=>{
        res.redirect('/')
     })
    }
}