var express = require('express')
var app = express()

var fs = require('fs')
var _ = require('lodash')
var enginees=require('consolidate')
var users = []

fs.readFile('users.json', {encoding: 'utf8'}, function (err, data) {
    if (err) throw err
    JSON.parse(data).forEach(function (user) {
        user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
        users.push(user)
    })

})
app.engine('hbs',enginees.handlebars)
app.set('views','./views')
app.set('view engine','hbs')

app.use('/profilepics',express.static("images"))
// to use jade app.set('view engine','jade')

// app.get('/', function (req, res) {
//     var buffer = ''
//     users.forEach(function (user) {
//         // buffer += '<a href="/' + user.username + '">' + user.name.full + '</a><br>'
//         buffer += '<a href="/' + user.username + '">' + user.name.full + '</a><br>'
//     })
//    res.send(buffer)
// })
app.get('/', function (req, res) {
    res.render("index",{users: users})
})

app.get(/big.*/,function (req,res,next) {
    console.log("BIG USER ACCESS")
    next()
})
app.get(/dog.*/,function (req,res,next) {
    console.log("DOG GOES WOOF ")
    next()
})

app.get('/:username',function (req,res) {
    var username=req.params.username
    res.send(username)
})
app.get('/table',function (req,res) {
    var buffer=''
    buffer="<!DOCTYPE html>\n" +
        "<html>\n" +
        "<head>\n" +
        "<style>\n" +
        "table {\n" +
        "    font-family: arial, sans-serif;\n" +
        "    border-collapse: collapse;\n" +
        "    width: 100%;\n" +
        "}\n" +
        "\n" +
        "td, th {\n" +
        "    border: 1px solid #dddddd;\n" +
        "    text-align: left;\n" +
        "    padding: 8px;\n" +
        "}\n" +
        "\n" +
        "tr:nth-child(even) {\n" +
        "    background-color: #dddddd;\n" +
        "}\n" +
        "</style>\n" +
        "</head>\n" +
        "<body>\n" +
        "\n" +
        "<h2>HTML Table</h2>\n" +
        "\n" +
        "<table>\n" +
        "  <tr>\n" +
        "    <th>Company</th>\n" +
        "    <th>Contact</th>\n" +
        "    <th>Country</th>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Alfreds Futterkiste</td>\n" +
        "    <td>Maria Anders</td>\n" +
        "    <td>Germany</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Centro comercial Moctezuma</td>\n" +
        "    <td>Francisco Chang</td>\n" +
        "    <td>Mexico</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Ernst Handel</td>\n" +
        "    <td>Roland Mendel</td>\n" +
        "    <td>Austria</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Island Trading</td>\n" +
        "    <td>Helen Bennett</td>\n" +
        "    <td>UK</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Laughing Bacchus Winecellars</td>\n" +
        "    <td>Yoshi Tannamuri</td>\n" +
        "    <td>Canada</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Magazzini Alimentari Riuniti</td>\n" +
        "    <td>Giovanni Rovelli</td>\n" +
        "    <td>Italy</td>\n" +
        "  </tr>\n" +
        "</table>\n" +
        "\n" +
        "</body>\n" +
        "</html>"
    res.send(buffer);
})


var server = app.listen(3022, function () {
    console.log('Server running at http://localhost:' + server.address().port)
})