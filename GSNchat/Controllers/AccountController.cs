using GSNchat.Models;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using Orchestrate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using System.Web.Helpers;
using System.Web.Http;

namespace GSNchat.Controllers
{

[RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
     //private AuthRepository _repo = null;
    Orchestrate.Net.Orchestrate orchestrate = new Orchestrate.Net.Orchestrate("0b42c04c-0d70-4da8-a3c1-2036882369d0");
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

            if (userModel.ConfirmPassword.Equals(userModel.Password)) {
                var hashpw = Crypto.HashPassword(userModel.Password);
               // var hasheml = Crypto.Hash(userModel.Email);
                userModel.Password = hashpw;
                userModel.ConfirmPassword = hashpw;  
            }
            

           var result = orchestrate.Put("users",userModel.UserName, JsonConvert.SerializeObject(userModel));
 
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

        // PATCH api/Account
        [Authorize]
        //[System.Web.Http.Authorize(Roles="Admin")]
        [HttpPatch]
        public async Task<IHttpActionResult> PatchUser(ComplexUserModel complexObj )
        {
            UserModel userModel = complexObj.UserModel;
            string UserName = complexObj.UserName;

            var auth = JsonConvert.DeserializeObject<UserModel>(orchestrate.Search("users", UserName, 1).Results.FirstOrDefault().Value.ToString());
           if(auth.Role.Equals("Admin")){
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (userModel.ChangePass) {
                userModel.Password = Crypto.HashPassword(userModel.Password);
                userModel.ConfirmPassword = Crypto.HashPassword(userModel.ConfirmPassword);
            }

            
            var patchObj = new List<object>() { };
            PropertyInfo[] properties = typeof(UserModel).GetProperties();
            foreach (PropertyInfo property in properties) {
                patchObj.Add(new { op = "add", path = property.Name, value = property.GetValue(userModel)});
            }

            var result = orchestrate.Patch("users",userModel.UserName, patchObj);

            return Ok(result.ToString());
           } else{
           
               return Unauthorized();
           }

        }
    
        // GET: api/account/username
    [HttpGet]    
    public Object GetUsers()
        {
          
            return orchestrate.List("users", 100, null, null); 
        }

    // DELETE: api/account/5
    [AllowAnonymous]
    [HttpDelete]
    public void DeleteUser(string username)
    {
        orchestrate.Delete("users", "Test", true);
    }
    

}
 
}
