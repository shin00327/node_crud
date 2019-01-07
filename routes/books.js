var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn = mysql.createConnection({
    host : "localhost",
    user : "sja",
    password : "sja",
    database : "sja"
});

conn.connect(function(err){
    if(err){
        throw err;
    }
        console.log("DB Connection Success");
})

/* GET users listing. */
router.get('/', function(req, res, next) {
    var sql = "select * from books";
    conn.query(sql, function(err, row){
        if(err){
            throw err;
        }
        res.render('index', { page : './sub/books.ejs', data : row});    
    });    
});

router.post('/addBook', function(req, res, next) {
    var sql = "select * from books where booksname = ?";
    conn.query(sql, [req.body.booksname], function(err, row){
        if(err){
            throw err;
        }
        if(row.length === 0){
            var sql = "insert into books(booksname, booksqty, booksprice, booksimg)values(?,?,?,?)"//중복 X
            conn.query(sql, [req.body.booksname, req.body.booksqty, req.body.booksprice, req.body.booksimg], function(err, result){
                if(err){
                    throw err;
                }
                if(result){
                    res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
                    res.write("<script>alert('도서 등록이 완료되었습니다.');location.href='/books';</script>")//
                }
                else{
                    res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
                    res.write("<script>alert('도서 등록이 실패했습니다.');history.back();</script>")//
                }
            });
        }else{
            res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
            res.write("<script>alert('중복된 도서입니다.');history.back();</script>")//중복 O
        }
    });
});//받는 데이터

router.post('/modify', function(req, res, next) {
    var sql = "update books set ? where booksno = ?";
    conn.query(sql, [req.body, req.body.booksno], function(err, result){
        if(err){
            throw err;
        }
        if(result){
            res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
            res.write("<script>alert('도서 수정이 완료되었습니다.');location.href='/books';</script>")//
        }
        else{
            res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
            res.write("<script>alert('도서 수정이 실패했습니다.');history.back();</script>")//
        }
    });
});//받는 데이터
router.get('/remove/:id', function(req, res, next) {
    // res.send(req.params);
    var id = req.params.id;
    var sql = "delete from books where booksno = ?";
    conn.query(sql, [id], function(err, result){
        if(err){
            throw err;
        }
        if(result){
            res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
            res.write("<script>alert('삭제가 완료되었습니다.');location.href='/books';</script>")//
        }
        else{
            res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
            res.write("<script>alert('삭제에 실패했습니다.');history.back();</script>")//
        }
    });    
});

//row에 담은 데이터를 보내준다
// 미들웨어등록을 해야함 app.js
module.exports = router;
