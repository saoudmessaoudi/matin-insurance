using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;
using MongoDB.Bson;
using System;
using MailKit.Net.Smtp;
using MimeKit;

namespace server.Services
{

    public class EmailService
    {
        public static void Send(string subject, string message_body, string[] tos)
        {
            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress("Admin", "saoud@novem.dev");
            message.From.Add(from);

            foreach(string to in tos){
                MailboxAddress m_to = new MailboxAddress("User", to);
                message.To.Add(m_to);
            }

            message.Subject = subject;
            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.TextBody = message_body;
            message.Body = bodyBuilder.ToMessageBody();

       
            SmtpClient client = new SmtpClient();
            client.CheckCertificateRevocation = false;
            client.Connect("smtp.dreamhost.com");
            client.Authenticate("saoud@novem.dev", "Bruhmoment01!");
            client.Send(message);
            client.Disconnect(true);
            client.Dispose();
        }

    }
}