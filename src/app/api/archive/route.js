import { NextResponse } from 'next/server';
import axios from 'axios';

var fs = require('fs'),
  path = require('path'),
  util = require('util');
var dirToJSON = function (dir, done) {
  var results = [];

  function recWalk(d, res) {
    var list = fs.readdirSync(d);
    list.forEach((name) => {
      var tempResults = [];
      var file = path.resolve(d, name);
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        recWalk(file, tempResults);
        var obj = {};
        obj[name] = tempResults;
        res.push(obj);
      } else {
        if (name.charAt(0) != '.') {
          res.push(name);
        }
      }
    });
  }

  try {
    recWalk(dir, results);
    done(null, results);
  } catch (err) {
    done(err);
  }
};

export async function GET(request) {
  let output = [];
  let res = {};
  let res2 = {};
  dirToJSON('./public/archive', function (err, results) {
    if (err) console.log(err);
    else output = results;
  });

  for (const folder of output) {
    for (const file in folder) {
      res[file] = folder[file];
    }
  }

  for (const folder in res) {
    res2[folder] = {};
    for (const show of res[folder]) {
      for (const showName in show) {
        res2[folder][showName] = show[showName];
      }
    }
  }
  return NextResponse.json(res2);
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  console.log(request);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
