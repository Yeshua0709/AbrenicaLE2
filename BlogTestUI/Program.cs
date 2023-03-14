using BlogDataLibrary.Data;
using BlogDataLibrary.Database;
using BlogDataLibrary.Models;
using Microsoft.Extensions.Configuration;
using System;


namespace BlogTestUI

{
    internal class Program
    {
       

        static void Main(string[] args)
        {
            SqlData db = GetConnection();

            Console.WriteLine("LOGIN");
            Authenticate(db);
            Console.WriteLine("");
            Console.WriteLine("");
            Console.WriteLine("REGISTER");
            Register(db);
            Console.WriteLine("");
            Console.WriteLine("");
            Console.WriteLine("ADD A POST");
            AddPost(db);
            Console.WriteLine("");
            Console.WriteLine("");
            Console.WriteLine("SHOW ALL POSTS");
            ListPosts(db);
            Console.WriteLine("");
            Console.WriteLine("");
            Console.WriteLine("SHOW A SPECIFIC POST");
            ShowPostDetails(db);
            Console.WriteLine("");
            Console.WriteLine("");


            /*

            int choice = 0;
            string strchoice;
            

            Console.WriteLine("Welcome to the Blog Application");

            Console.WriteLine("Select Action");

            Console.WriteLine("1. Log In\n2. Register\n3. Add Post\n4. List Post\n5. Show Post Details\n6. Exit");
            Console.Write("Input Number:");
            strchoice = Console.ReadLine();
            choice = int.Parse(strchoice);

            Console.WriteLine("");
            Console.WriteLine("");

            if (choice == 1) { Authenticate(db); }

            else if(choice == 2) { Register(db); }

            else if (choice == 3) { AddPost(db); }
            else if (choice == 4) { ListPosts(db); }
            else if (choice == 5) { ShowPostDetails(db);  }
            else if (choice == 6) { Environment.Exit(0); }

            else
            {
               
                Console.WriteLine("");
                Console.WriteLine("");
                Main(args);
            }
            
            Console.WriteLine("");
            Console.WriteLine("");
            Main(args);

            */





        }


        static SqlData GetConnection()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");

            IConfiguration config = builder.Build();
            ISqlDataAccess dbAccess = new SqlDataAccess(config);
            SqlData db = new SqlData(dbAccess);

            return db;


        }


        private static UserModel GetCurrentUser(SqlData db)
        {
            Console.Write("Username:");
            string username = Console.ReadLine();

            Console.Write("Password:");
            string password = Console.ReadLine();

            UserModel user = db.Authenticate(username, password);

            return user;
        }

        public static void Authenticate(SqlData db)
        {
            UserModel user = GetCurrentUser(db);

            if (user == null)
            {
                Console.WriteLine("Invalid Credentials");
            }
            else
            {
                Console.WriteLine($"Welcome, {user.UserName}");
            }
        }

        public static void Register(SqlData db)
        {
            Console.Write("Enter new username: ");
            var username = Console.ReadLine();

            Console.Write("Enter new password: ");
            var password = Console.ReadLine();

            Console.Write("Enter first name: ");
            var firstName = Console.ReadLine();

            Console.Write("Enter last name: ");
            var lastName = Console.ReadLine();

            db.Register(username, firstName, lastName, password);
        }


        private static void AddPost(SqlData db)
        {
            UserModel user = GetCurrentUser(db);

            Console.WriteLine("Title: ");
            string title = Console.ReadLine();

            Console.WriteLine("Body: ");
            string body = Console.ReadLine();

            PostModel post = new PostModel
            {
                Title = title,
                Body = body,
                DateCreated = DateTime.Now,
                UserId = user.Id

            };

            db.AddPost(post);
        }

        private static void ListPosts(SqlData db)
        {
            List<ListPostModel> posts = db.ListPosts();
            foreach (ListPostModel post in posts)
            {
                Console.WriteLine($"{post.Id}. Title: {post.Title} by {post.UserName} [{post.DateCreated.ToString("yyyy-MM-dd")}]");
                Console.WriteLine($"{post.Body.Substring(0,20)}...");
                Console.WriteLine();
            }
        }

        private static void ShowPostDetails(SqlData db)
        {
            Console.Write("Enter a post ID: ");
            int id = Int32.Parse(Console.ReadLine());

            ListPostModel post = db.ShowPostDetails(id);
            Console.WriteLine(post.Title);
            Console.WriteLine($"by {post.FirstName} {post.LastName} [{post.UserName}]");

            Console.WriteLine();

            Console.WriteLine(post.Body);

            Console.WriteLine(post.DateCreated.ToString("MMM d yyyy"));
        }



    }

   
}