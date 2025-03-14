import db from "../Database";

const admin = await db.user.create({
  data: {
    username: "Kongpop",
    email: "kongpop.k@gmail.com",
    password: await Bun.password.hash("Kong123!" + "qwertyuiop", "bcrypt"),
    name: "Kongpop",
    surname: "Koirod",
    tel: "0812345678",
    salt: "qwertyuiop",
    Admin: {
      create: {
        id: 1,
      },
    },
  },
  include: {
    Admin: true,
  },
});

const rider = await db.user.create({
  data: {
    username: "Kongkiat",
    email: "Kongkiat.k@gmail.com",
    password: await Bun.password.hash("Kong123!" + "qwertyuiop", "bcrypt"),
    name: "Kongkiat",
    surname: "Koiking",
    tel: "0812345678",
    salt: "qwertyuiop",
    Rider: {
      create: {
        vehicle_registration: "กก 1234",
        vehicle_type: {
          create: {
            vehicle_type: "Motorcycle",
            wheel: 2,
          },
        },
        bank_account: {
          create: {
            bank_account_number: "123456789012345678",
            account_holder_name: "Kongpop Koiking",
            Bank: {
              create: {
                bank_name: "Kasikorn Bank",
              },
            },
          },
        },
        Rider_location: {
          create: {
            latitude: 13.725,
            longitude: 100.581,
          },
        },
        Rider_Documents: {
          create: {
            id_card_url:
              "https://i.ebayimg.com/images/g/EPYAAOSw36tdVrM6/s-l1200.jpg",
            checked_by_admind_id: 1,
            driving_license_url:
              "https://i.ebayimg.com/images/g/EPYAAOSw36tdVrM6/s-l1200.jpg",
            criminal_history_examination_form_url:
              "https://pcscenter.sbpolice.go.th/en",
            owner_with_vehicle_picture_url:
              "https://www.stayupright.com.au/wp-content/uploads/2021/03/Licencing-Courses-e1614912251694.jpg",
          },
        },
      },
    },
  },
  include: {
    Rider: {
      include: {
        vehicle_type: true,
        bank_account: {
          include: {
            Bank: true,
          },
        },
        Rider_location: true,
        Rider_Documents: true,
      },
    },
  },
});

const user_with_shop_and_charity = await db.user.create({
  data: {
    username: "Meenoi",
    email: "meenoi.k@gmail.com",
    password: await Bun.password.hash("Meenoi1150!" + "asdfghjkl", "bcrypt"),
    name: "Meemoi",
    surname: "Koiruk",
    tel: "0813541179",
    salt: "asdfghjkl",
    profile_image_url:
      "https://i.pinimg.com/736x/6a/d7/2f/6ad72f2370b68be1f06b4463d8aec8df.jpg",

    User_location: {
      create: {
        address:
          "123/456 ถนน สุขุมวิท แขวง คลองเตย เขต คลองเตย กรุงเทพมหานคร 10110",
        latitude: 13.725,
        longitude: 100.581,
      },
    },
    Shop: {
      create: {
        name: "Dokjik Shop",
        description: "Drink's Shop",
        open_time: "2025-03-14T08:00:00.440Z",
        close_time: "2025-03-14T20:00:00.440Z",
        address: "อาคาร 45 ปี คณะวิทยาศาสตร์ Lat Yao, จตุจักร Bangkok 10900",
        latitude: 13.8456,
        longitude: 100.5684,
        bank_account: {
          create: {
            bank_account_number: "123456789012345679",
            account_holder_name: "Meenoi Koiruk",
            Bank: {
              create: {
                bank_name: "Krung Thai Bank",
              },
            },
          },
        },
        Shop_images: {
          createMany: {
            data: [
              {
                image_url:
                  "https://scontent.fbkk10-1.fna.fbcdn.net/v/t39.30808-6/465105736_1022357336359058_523408579898380194_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGYNpHqAnLq8Gx_KJ7qAlkVGUzidiMNM4sZTOJ2Iw0zi3Zv1vhEkjKgIV43pb7NkQIdvWJSpZYlbtVMGuLt0Ok0&_nc_ohc=iiwdvFxl8GcQ7kNvgFHs-Um&_nc_oc=AdiFR5_OlvKSztMVQnCpXFIdbVPqBS7bzRMjQFHR3yLfiObWJ-jbxiL0MaMw4dzhgE0&_nc_zt=23&_nc_ht=scontent.fbkk10-1.fna&_nc_gid=fLGG9hMDTILrCMRzHWupRg&oh=00_AYHRdZ5HitJeOPLoj8AssyQKhYPe5Glr9PE7ztUdV9naFg&oe=67D99197",
              },
              {
                image_url:
                  "https://scontent.fbkk10-1.fna.fbcdn.net/v/t39.30808-6/481904576_1110578927536898_3670329083035134541_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEC190vSFFb7bX4p8K-IGnpVT7E0h7qUMBVPsTSHupQwJ35X6pAytx3uLgmk45PSEeu1Ow_v25bK7k9EGYZWQQS&_nc_ohc=537BLcPjxKkQ7kNvgFxtQlH&_nc_oc=AdgrJaxFVvp1ZZeg0LLM9ii5pTc--8WMxR9MoR8Iudq5XcTIE3INPQfhzvXaGpLiQLA&_nc_zt=23&_nc_ht=scontent.fbkk10-1.fna&_nc_gid=AZZ6Ea9NzYBmLhViJ-4uwMx&oh=00_AYFGRU69WHPMkYIHgH8OgB9P_diMtq7jU_P1CttAFeJzrg&oe=67D9A250",
              },
            ],
          },
        },
        Shop_documents: {
          create: {
            checked_by_admin_id: 1,
            id_card_url:
              "https://image.mfa.go.th/mfa/0/91fPdh6NtO/Consular-Services/%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%8A%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2/Thai_ID_Card_Mockup.png",
          },
        },
        Product_category: {
          createMany: {
            data: [
              { id: 1, category_name: "Coffee" },
              { id: 2, category_name: "Soda" },
            ],
          },
        },
        Product: {
          createMany: {
            data: [
              {
                name: "Espresso",
                description:
                  "Espresso is a coffee-making method of Italian origin, in which a small amount of nearly boiling water is forced under pressure through finely-ground coffee beans.",
                price: 30,
                image_url:
                  "https://img.wongnai.com/p/1920x0/2020/12/17/533c81c6deec4692bdfc15e490d34a0c.jpg",
                amount: 100,
                product_category_id: 1,
              },
              {
                name: "Fruity Lava",
                description:
                  "Fruity Lava is a coffee-making method of Italian origin, in which a small amount of nearly boiling water is forced under pressure through finely-ground coffee beans.",
                price: 50,
                image_url:
                  "https://img.wongnai.com/p/800x0/2021/11/07/4d9f0df10a284a1f8593349e46bb41ba.jpg",
                amount: 100,
                product_category_id: 2,
              },
            ],
          },
        },
      },
    },
    Charity: {
      create: {
        name: "Charity for Children",
        description: "Charity for Children",
        open_time: "2025-03-14T08:00:00.440Z",
        close_time: "2025-03-14T20:23:59.440Z",
        Charity_documents: {
          create: {
            checked_by_admin_id: 1,
            certificate_of_registration_url:
              "https://images.sampletemplates.com/wp-content/uploads/2020/04/Sample-Charity-Registration-Statement.jpg",
            list_of_board_members_url:
              "https://www.gov.uk/find-charity-information",
            tax_exemption_url: "https://www.rd.go.th/english/6045.html",
            proof_of_the_foundation_address_url:
              "https://maps.app.goo.gl/93WygQxpQgkbZUJh6",
          },
        },
        Charity_images: {
          createMany: {
            data: [
              {
                image_url:
                  "https://www.nspcc.org.uk/globalassets/blocks---please-dont-save-images-here/03.-support-us/partner-with-us/partners-in-business/25296-exp-2024-01.jpg?width=876&mode=crop&anchor=middlecenter",
              },
            ],
          },
        },
      },
    },
  },
  include: {
    User_location: true,
    Shop: {
      include: {
        Shop_images: true,
        Shop_documents: true,
        Product_category: true,
        Product: true,
      },
    },
    Charity: {
      include: {
        Charity_documents: true,
        Charity_images: true,
      },
    },
  },
});

const order = await db.order.create({
  data: {
    charity_id: 1,
    customer_id: user_with_shop_and_charity.uuid,
    rider_id: rider.Rider?.id || 1,
    shop_id: user_with_shop_and_charity.Shop[0].id,
    pickup_location_id: user_with_shop_and_charity.User_location[0].id,
    service_fee: 10,
    note: "Please be careful",
    status: "DELIVERED",
    finish_job_image_url:
      "https://media.gettyimages.com/id/691036643/photo/portrait-of-confident-biker-sitting-on-motorcycle-against-sky.jpg?s=612x612&w=gi&k=20&c=JiCGCjxKsbsfOUwkybclg0PRUGQJT3n33-4NLvWzxeA=",
    Product_list: {
      createMany: {
        data: [
          {
            product_id: user_with_shop_and_charity.Shop[0].Product[0].id,
            quantity: 2,
          },
          {
            product_id: user_with_shop_and_charity.Shop[0].Product[1].id,
            quantity: 3,
          },
        ],
      },
    },
    Transaction: {
      create: {
        payment_method: "CASH",
        reference_id: "1234567890",
        status: "ACCEPTED",
      },
    },
  },
  include: {
    Product_list: true,
    Transaction: true,
  },
});

const reason = await db.reason.create({
  data: {
    reason: "Rider is not polite",
  },
});

const report = await db.report.create({
  data: {
    checked_by_admin_id: admin.Admin?.id || 1,
    report_by: "USER",
    report_to: "RIDER",
    from_order_id: order.id,
    note: "Rider is not polite",
    status: "RESOLVED",
    reason_id: reason.id,
  },
});
