const ex = require("express");
const app = ex();
const bp = require("body-parser");
app.use(bp.urlencoded({extended:true}));

const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mytask"
});
app.set('views','./view');
app.set('view engine', 'ejs');
con.connect(function(err)
{
    if(err) throw err;
    else
    console.log("connected");
}
);
app.get("/",function(req,res){
    res.sendFile(__dirname + "/htmlpages/welcome.html");
});

app.get("/sign", function(req,res){
    res.sendFile(__dirname + "/htmlpages/signup.html");
});


app.post("/ch",function(req,res){
    let n = req.body.t1;
    let a = req.body.t2;
    let s = req.body.t3;
    let p = req.body.t4;
    
        var sql = "INSERT INTO reg (name, age, std, password) VALUES ('"+n+"','"+a+"','"+s+"','"+p+"')";
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log("data inserted");
        });

    
    res.sendFile(__dirname + "/htmlpages/first.html");

});

app.post("/log" ,function(req,res)
{
    let n = req.body.t1;
    let p = req.body.t4;

    
    
        con.query("SELECT * FROM reg WHERE name = '"+n+"' and password = '"+p+"'", function (err, result) {
          if (err) throw err;
          else
          console.log("login");
        });
          res.sendFile(__dirname+"/htmlpages/first.html");
      });

      
    app.get('/list' , function(req,res){
   
        var sql = "SELECT * FROM reg";
        con.query(sql,function(err,result){
            if(err) throw err;
            else
            res.render('print',{data:result});
        });
    });
      app.get("/edit",function(req,res){
            con.query("SELECT * FROM reg WHERE id="+req.query["id"], function (err1, result) {
          if (err1) throw err1;
          else
          res.render('editd',{data:result});
        });


    
      });
      app.post("/upload",function(req,res){
        let n = req.body.t1;
        let a = req.body.t2;
        let s = req.body.t3;
        let p = req.body.t3;
        let id = req.body.t0;
        
            var sql = "update reg set name='"+n+"',age='"+a+"',std='"+s+"',password='"+p+"' where id="+id;
            con.query(sql,function(err,result){
                if(err) throw err;
                else
                {
                    var sql = "SELECT * FROM reg";
                    con.query(sql,function(err,result){
                        if(err) throw err;
                        else
                        res.render('print',{data:result});
                    });
                }
            });
    });



    app.get("/del",function(req,res)
    {
    
        var sql = "delete from reg where id="+req.query["id"];
        con.query(sql,function(err,result){
            if(err) throw err;
            else
            var sql = "SELECT * FROM reg";
            con.query(sql,function(err,result){
                if(err) throw err;
                else
                res.render('print',{data:result});
            });
        });
    });
    



app.listen(9090,function(req,res){
    console.log("server is running on port no 9090");
});

