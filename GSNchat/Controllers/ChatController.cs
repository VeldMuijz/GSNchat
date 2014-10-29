using GSNchat.Models;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;


namespace GSNchat.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix("api/chat")]
    public class ChatController : ApiController
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("sendmessage")]
        [HttpPost]
        public async Task<IHttpActionResult> SendMessage(ChatModel model) {

           var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
           await hubContext.Clients.All.broadcastMessage(model.UserName, model.Message);
             
             return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("sendmessage/pm/{groupID:long}")]
        [HttpPost]
        public async Task<IHttpActionResult> SendGroupMessage(ChatModel model)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            await hubContext.Clients.All.broadcastMessage(model.UserName, model.Message);

            return Ok();
        }
        
        

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>       
        [Route("sendmessage/joinchat/{groupID:long}")]
        [HttpPost]
        public async Task<IHttpActionResult> JoinGroup(ChatModel model)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            await hubContext.Clients.All.broadcastMessage(model.UserName, model.Message);

            return Ok();
        }





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
