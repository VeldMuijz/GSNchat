using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
namespace GSNchat
{
    public class ChatHub : Hub
    {
        private readonly static GSNchat.ChatConnection.ConnectionMapping<string> _connections =
            new GSNchat.ChatConnection.ConnectionMapping<string>();
        public void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);

        }

        public override Task OnConnected()
        {

            string name = Context.QueryString["user"];

            _connections.Add(name, Context.ConnectionId);
            Clients.All.userLogin(name,Context.ConnectionId);

            return base.OnConnected();
        }

         public override Task OnDisconnected(bool stopCalled)
        {
            string name = Context.QueryString["user"];

            _connections.Remove(name, Context.ConnectionId);

            Clients.All.userLogoff(name, Context.ConnectionId);

            return base.OnDisconnected(stopCalled);
        }

        //public override Task OnReconnected()
        //{
        //    string name = Context.User.Identity.Name;

        //    if (!_connections.GetConnections(name).Contains(Context.ConnectionId))
        //    {
        //        _connections.Add(name, Context.ConnectionId);
        //    }

        //    return base.OnReconnected();
        //}
    }

    }

