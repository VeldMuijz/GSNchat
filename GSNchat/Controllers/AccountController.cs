using GSNchat.Models;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using Orchestrate.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace GSNchat.Controllers
{

[RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
     //private AuthRepository _repo = null;
 
        public AccountController()
        {
            //_repo = new AuthRepository();
        }
 
        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var orchestrate = new Orchestrate.Net.Orchestrate("0b42c04c-0d70-4da8-a3c1-2036882369d0");


           var result = orchestrate.Put("users", "2", JsonConvert.SerializeObject(userModel));
 
            ////IHttpActionResult errorResult = GetErrorResult(result);
 
            //if (result.Score != 1)
            //{
            //    return (IHttpActionResult) result.Value;
            //}
 
            return Ok(result.ToString());
        }
 
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //_repo.Dispose();
            }
 
            base.Dispose(disposing);
        }
 
        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }
 
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }
 
                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }
 
                return BadRequest(ModelState);
            }
 
            return null;
        }
    }
 
}
