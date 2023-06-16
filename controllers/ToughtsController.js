const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtsController{
    static async showToughts(req,res){
        res.render('toughts/home')
    }
    static async dashboard(req,res){
        const userId= req.session.userid;
       const user= await User.findOne({
        where: {
          id: userId,
        },
        include: Tought,
         plain: true,
       })
       if(!user){ 
        res.redirect('/login')
       }
     
        const toughts= user.Toughts.map((result)=> result.dataValues)
        
        let emptyToughts = false
         if(toughts.length ==0){
          emptyToughts= true
         }
        res.render('toughts/dashboard',{toughts,emptyToughts})
    }
    static create(req,res){
        res.render('toughts/create')
    }
    static async createPost(req,res){
        const tought= {
          title: req.body.title,
          UserId: req.session.userid
        }
      try{
        await Tought.create(tought)
        req.flash('message','Pensamento criado com sucesso!')
        req.session.save(()=>{
        res.redirect('/toughts/dashboard')
        })
        
      } catch(error){
        console.log(error)
      }
    }
    static async removeTought(req,res){ 
    const id= req.params.id
     const UserId= req.session.userid
    await Tought.destroy({where:{ id:id, UserId: UserId}})
    req.flash('message','Pensamento removido com sucesso!')     
    req.session.save(()=>{
      res.redirect('/toughts/dashboard')
    })
    
    }
    static async edit(req,res){
      const id= req.params.id
      const tought = await Tought.findOne({where:{id:id}, raw:true})
      res.render('toughts/edit',{tought})
    }
    static async editPost(req,res){
      const id=req.body.id
      const tought={
        title:req.body.title,
      }
      
      await Tought.update(tought,{where:{id:id}})
      req.flash('message',)
      res.redirect('/toughts/dashboard')
    }
}