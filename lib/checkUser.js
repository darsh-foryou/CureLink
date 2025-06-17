// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "./prisma";

// export const checkUser = async () => {
//   const user = await currentUser();
//   if(!user){
//     return null;
//   }
//   try{
//     // calling the database to add this user
//     //findUnique is to find a unique user in our database. User cannot be duplicate
//     const loggedInUser = await db.user.findUnique({
//         where:{
//             clerkUserId: user.id,
//         },
//         include:{
//             transactions:{
//                 where:{
//                     type:" CREDIT_PURCHASE",
//                     createdAt:{
//                         gte:new Date(new Date().getFullYear(), new Date().getMonth, 1)
//                     },
//                 },
//                 orderBy: {
//                     createdAt : "desc",
//                 },
//                 take :1,
//             },
//         },
//     });
//     //if the user exist just return the user
//     if(loggedInUser){
//         return loggedInUser;
//     }
//     //if not then add it to the database
//     else{
//         const name = `${user.firstName} ${user.lastName}`;
//         const newUser = await db.user.create({
//             data:{
//                 clerkUserId : user.id,
//                 name,
//                 imageUrl: user.imageUrl,
//                 email: user.emailAddresses[0].emailAddress,
//                 transactions: {
//                     create: {
//                         type: "CREDIT_PURCHASE",
//                         packageId: "free_user",
//                         amount: 2,
//                     },
//                 },
//             },
//         });

//         return newUser;
//     }

//   } catch(err){
//     console.log(err);
//   }
// };


import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        transactions: {
          where: {
            type: "CREDIT_PURCHASE",
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    } else {
      const name = `${user.firstName} ${user.lastName}`;
      const newUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          name,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
          transactions: {
            create: {
              type: "CREDIT_PURCHASE",
              packageId: "free_user",
              amount: 2,
            },
          },
        },
      });

      return newUser;
    }
  } catch (err) {
    console.error("Error checking user:", err);
    return null;
  }
};

