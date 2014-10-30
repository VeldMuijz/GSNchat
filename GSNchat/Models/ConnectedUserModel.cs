using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GSNchat.Models
{
    public class ConnectedUserModel
    {
        public String Name { get; set; }
        public HashSet<string> ConnectionID { get; set; }
    }
}