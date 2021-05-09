var config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;

var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function gameTop10(req, res) {
  var sql = `select 'Action' genre,v1.* from(SELECT d.appid, d.name, m.header_image,FORMAT(d.positive_ratings /(d.positive_ratings+ d.negative_ratings) * 10, 1) AS rating, d.positive_ratings, d.negative_ratings FROM steam.game d, steam.media m
        where d.appid = m.steam_appid 
        and d.genres like '%Action%' 
        order by d.positive_ratings desc
        limit 10)v1
        UNION ALL
        select 'RPG' genre,v2.* from(
        SELECT d.appid, d.name, m.header_image, FORMAT(d.positive_ratings /(d.positive_ratings+ d.negative_ratings) * 10, 1) AS rating, d.positive_ratings, d.negative_ratings FROM steam.game d, steam.media m
        where d.appid = m.steam_appid 
        and d.genres like '%RPG%' 
        order by d.positive_ratings desc
        limit 10)v2
        UNION ALL
        select 'Strategy' genre,v3.* from(
        SELECT d.appid, d.name, m.header_image, FORMAT(d.positive_ratings /(d.positive_ratings+ d.negative_ratings) * 10, 1) AS rating, d.positive_ratings, d.negative_ratings FROM steam.game d, steam.media m
        where d.appid = m.steam_appid 
        and d.genres like '%Strategy%' 
        order by d.positive_ratings desc
        limit 10)v3
        UNION ALL
        select 'Simulation' genre,v4.* from(
        SELECT d.appid, d.name, m.header_image, FORMAT(d.positive_ratings /(d.positive_ratings+ d.negative_ratings) * 10, 1) AS rating, d.positive_ratings, d.negative_ratings FROM steam.game d, steam.media m
        where d.appid = m.steam_appid 
        and d.genres like '%Simulation%' 
        order by d.positive_ratings desc
        limit 10)v4
        UNION ALL
        select 'Racing' genre,v5.* from(
        SELECT d.appid, d.name, m.header_image, FORMAT(d.positive_ratings /(d.positive_ratings+ d.negative_ratings) * 10, 1) AS rating, d.positive_ratings, d.negative_ratings FROM steam.game d, steam.media m
        where d.appid = m.steam_appid 
        and d.genres like '%Racing%' 
        order by d.positive_ratings desc
        limit 10)v5
        UNION ALL
        select 'Casual' genre,v6.* from(
        SELECT  d.appid, d.name, m.header_image, FORMAT(d.positive_ratings /(d.positive_ratings+ d.negative_ratings) * 10, 1) AS rating, d.positive_ratings, d.negative_ratings FROM steam.game d, steam.media m
        where d.appid = m.steam_appid 
        and d.genres like '%Casual%' 
        order by d.positive_ratings desc
        limit 10)v6
        UNION ALL
        select 'Adventure' genre,v7.* from(
        SELECT d.appid, d.name, m.header_image, FORMAT(d.positive_ratings /(d.positive_ratings+ d.negative_ratings) * 10, 1) AS rating, d.positive_ratings, d.negative_ratings FROM steam.game d, steam.media m
        where d.appid = m.steam_appid 
        and d.genres like '%Adventure%' 
        order by d.positive_ratings desc
        limit 10)v7`;

        console.log(sql)
  connection.query(sql, (err, values, fields) => {
    if (err) {
      res.status(400).json({
        code: 400,
        msg: err,
      });
    } else {
      const result = {};
      // a:list:[]
      // b:
      values.forEach((game, index) => {
        const { genre, appid } = game; //genre = [] by default
        // const genre =  game.genre;
        // const type =  game.genre;
        // const appid =  game.appid;
        if (!result[genre]) {
          //!result[type]
          result[genre] = { genre, list: [] };
        }
        result[genre].list.push(game);
      });

      res.json({
        code: 200,
        data: Object.values(result),
      });
    }
  });
}

function gameDetail(req, res) {
  const { appid } = req.params;
  //var appid = req.params.appid;
  const sql = `select s.website ,r.*,d.*,m.* from description d 
  left join requirements r on d.steam_appid  = r.steam_appid 
  left join support s on s.steam_appid  = d.steam_appid 
  left join steam.media m on s.steam_appid  = m.steam_appid 
  where d.steam_appid = ${appid}`;
  connection.query(sql, (err, values, fields) => {
    if (err) {
      res.status(400).json({
        code: 400,
        msg: err,
      });
    } else {
      res.json({
        code: 200,
        data: values[0],
      });
    }
  });
}

function search(req, res) {
  const {game_name='', price_begin='', price_end='', release_date='', genre='', rating='' } = req.query;
 
    let whereStr = '';
    if(price_begin){
        whereStr += ` and d.price > ${price_begin}`
    }
    if(price_end){
        whereStr += ` and d.price <= ${price_end}`
    }
    if(release_date){
        whereStr += ` and date_format(d.release_date,'%Y' )  = ${release_date}`
    }
    if(rating){
        whereStr += ` and ROUND(d.positive_ratings /(d.positive_ratings+ d.negative_ratings) * 10) = ${rating}`
    }

    let sql = `SELECT ROUND(d.positive_ratings /(d.positive_ratings+ d.negative_ratings) * 10) AS rating, d.*, m.header_image FROM game d
    inner join media m  on d.appid = m.steam_appid 
    where  
    d.name like '%${game_name}%'
    and d.genres like '%${genre}%'
    ${whereStr}
    order by d.average_playtime desc`;

    console.log(sql)

    connection.query(sql, (err, values, fields) => {
        if (err) {
          res.status(400).json({
            code: 400,
            msg: err,
          });
        } else {
          res.json({
            code: 200,
            data: values,
          });
        }
      });
}
function requirements(req, res) {
    const {game_name='' } = req.query;
 

    let sql = `SELECT r.minimum, r.pc_requirements, r.mac_requirements, r.linux_requirements, t1.*, m.*
FROM (SELECT *
FROM game 
WHERE game.name LIKE '%${game_name}%') t1 JOIN requirements r on t1. appid = r.steam_appid JOIN media m on t1.appid = m.steam_appid limit 10`;
  
      console.log(sql)
  
      connection.query(sql, (err, values, fields) => {
          if (err) {
            res.status(400).json({
              code: 400,
              msg: err,
            });
          } else {
            res.json({
              code: 200,
              data: values,
            });
          }
        });
  }



function tagSearch(req, res) {
    const {tags='' } = req.query;
    let tagList = tags.split(";");
    let searchStr = ""
    if( tagList.length >= 1 ){
      searchStr = "WHERE game.steamspy_tags LIKE '%" +  tagList[0] + "%'"
    }
    if( tagList.length >= 2 ){
      for( let idx = 1; idx < tagList.length; idx++ ){
        searchStr += " AND game.steamspy_tags LIKE '%" +  tagList[idx] + "%'"
      }
    }
    let sql = `SELECT t1.*, m.*
FROM (SELECT *FROM game ${searchStr}) t1 JOIN media m on t1.appid = m.steam_appid limit 10`;
  
      console.log(sql)
  
      connection.query(sql, (err, values, fields) => {
          if (err) {
            res.status(400).json({
              code: 400,
              msg: err,
            });
          } else {
            res.json({
              code: 200,
              data: values,
            });
          }
        });
  }

// The exported functions, which can be accessed in index.js.
module.exports = { gameTop10, gameDetail ,search, requirements, tagSearch };
