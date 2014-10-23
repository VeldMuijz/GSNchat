using GSNchat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GSNchat.Controllers
{
    public class ChatController : ApiController
    {
        // GET: api/Chat
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Chat/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Chat
        public IHttpActionResult Post(ChatModel model)
        {

            var chatmodel = model;
            var i = 0;
            return Ok();
        }

        // PUT: api/Chat/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Chat/5
        public void Delete(int id)
        {
        }
    }
}
