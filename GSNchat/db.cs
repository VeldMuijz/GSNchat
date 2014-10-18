using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GSNchat
{
    public class db
    {
        public db(){
        
        }

        string apikey = "0b42c04c-0d70-4da8-a3c1-2036882369d0";
        public db(string apikey) {
            var orchestrate = new Orchestrate.Net.Orchestrate(apikey);

          
        }
    }
}