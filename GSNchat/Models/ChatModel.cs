using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GSNchat.Models
{
    public class ChatModel
    {

        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }
        [Required]
        public string Message { get; set; }
        public List<string> Receivers { get; set; }


    }
}