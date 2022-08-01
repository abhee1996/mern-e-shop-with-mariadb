const fs = require("fs");
const buffer = require("buffer");
const path = require("path");
const express = require("express");
const { Products } = require("../models");
const models = require("../models");
const { Category, ProductImages } = require("../models");
const _dirname = path.resolve();
const cloudinary = require("cloudinary").v2;
const first = path.join(`${_dirname}`, `.\\public\\uploads\\`);
cloudinary.config({
  cloud_name: "masqsoft",
  api_key: "212414665549415",
  api_secret: "2xilKcmAlBiMZue5YhtIMo_eaJY",
});
const multer = require("multer");

const FILE_MIME_TYPE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_MIME_TYPE[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const extension = FILE_MIME_TYPE[file.mimetype];
    const uniqueSuffix = Date.now();
    let removefileSpaces = file.originalname.split(" ").join(`-`);
    let removefileDots = removefileSpaces.split(".").join(`-`);
    let fileOriginalName = `${removefileDots}-${uniqueSuffix}.${extension}`;
    // cb(null, `${fileOriginalName}-${uniqueSuffix}.${extension}`);
    cb(null, `${fileOriginalName}`);
  },
});

const uploadOptions = multer({ storage: storage });

//getall
async function getlist(req, res) {
  let result = await Products.findAll();
  res.json(result);
}
//getbyId

async function getProductById(req, res) {
  const _id = req.params.id;
  const result = await Products.findByPk(_id);
  res.json(result);
}
async function getProductByShopUUID(req, res) {
  console.log("enter in getOrdersByUserUUID", req);

  const _shop_uuid = req.params.id;
  console.log("_shop_uuid", _shop_uuid);
  const result = await Products.findAll({
    where: {
      shop_uuid: _shop_uuid,
    },
  });
  console.log("getProductByShopUUID", result);

  res.json(result);
}
async function getCountProduct(req, res) {
  const ProductCount = await Products.count(); //({ where: { id: { [Op.gt]: 25 } } });
  if (!ProductCount) {
    res.status(500).json({ success: false });
  }
  res.send({ ProductCount: ProductCount });
}
async function getfeaturedProduct(req, res) {
  const count = req.params.count ? req.params.count : 0;
  const result = await Products.findAll({ isFeatured: true }); //.limit(+count);
  if (!result) {
    res.status(500).json({ success: false });
  }
  res.json(result);
}
//Create
async function createProduct(req, res) {
  const reqbody = req.body;

  const files = req.files;

  const uniqueProductUUid = `Product${Date.now() + Date.now()}${Math.round(
    Math.random() * 1e9
  )}`;
  if (!files) return res.status(500).send("No image in the request");

  const baseURL = `${req.protocol}://${req.get("host")}/public/uploads/`;
  try {
    let result;
    let resultProductImages;
    let newProduct;
    let updateProductImage;
    if (files) {
      newProduct = {
        name: reqbody.name,
        sku: reqbody.sku,
        description: reqbody.description,
        productUuid: uniqueProductUUid,
        richDescription: reqbody.richDescription,
        image: `${baseURL}${files[0].filename}`,
        images_gallery_count: `${files.length} images`,
        brand: reqbody.brand,
        price: reqbody.price,
        countInStock: reqbody.countInStock,
        rating: reqbody.rating,
        numReviews: reqbody.numReviews,
        isFeatured: reqbody.isFeatured,
        shop_uuid: reqbody.shop_uuid || "shop_uuid null",
        category_uuid: reqbody.categoryId || "category_uuid null",
      };
      for (let i = 0; i < files.length; i++) {
        console.log(i, "here===>");
        let eachfile = files[i].filename;
        updateProductImage = {
          product_uuid: uniqueProductUUid,
          product_images: `${baseURL}${eachfile}`,
        };
        resultProductImages = await ProductImages.create(updateProductImage);
        if (!updateProductImage) {
          return res.status(500).send("no product Images in request");
        }
      }
      result = await Products.create(newProduct);

      res.status(200).send(`new product created Successfully`);
      if (!newProduct) {
        return res.status(500).send("no product in request");
      }
    }
  } catch (error) {
    console.log("error in creating new product", error);
  }
}
//get all product images
async function getProductImages(req, res) {
  console.log("enter in getProductImagesUUID", req.body);

  const _pdt_uuid = req.params.id;
  console.log("_shop_uuid", _pdt_uuid);
  const result = await ProductImages.findAll({
    where: {
      product_uuid: _pdt_uuid,
    },
  });
  console.log("orderResut", result);

  res.json(result);
}
async function updateProduct(req, res) {
  let _id = req.params.id;
  const reqbody = req.body;

  const result = await Products.update(reqbody, { where: { id: _id } });
  if (!result) {
    return res.status(500).send("no product in request");
  }

  res.status(200).json(result);
}
async function destroyProduct(req, res) {
  let _id = req.params.id;
  const result = await Products.destroy({ where: { id: _id } });
  if (!result) {
    return res.status(500).send("no product in request");
  }
  res.json(result);
}

module.exports = {
  getlist,
  createProduct,
  getProductById,
  updateProduct,
  destroyProduct,
  uploadOptions,
  getfeaturedProduct,
  getCountProduct,
  getProductImages,
  getProductByShopUUID,
  // productImages,
};
//PRODUCT IMAGES
// async function productImages(req, res) {
//   let _id = req.params.id;
//   let files = req.files;
//   //let imagePaths = [];
//   let baseURL = `${req.protocol}://${req.get("host")}/public/uploads/`;
//   console.log("files", files);
//   console.log("_id", _id);
//   let eachImage = files.map((file) => file.filename);
//   console.log("eachImage", eachImage);
//   console.log("files.length(", eachImage.length);
//   // var imageData = fs.readFileSync(
//   //   path.join(`${__dirname}.\\public\\uploads\\`) + each
//   // ); //fs.readFileSync(each.path);

//   // console.log("imageData", imageData);
//   try {
//     let result;

//     if (files) {
//       for (i = 0; i < files.length; i++) {
//         each = files[i].filename;
//         console.log("each", each);

//         result = await ProductImages.update(
//           { images: each },
//           { where: { id: _id } }
//         );
//         // result.then((img) => {
//         //   console.log("img", img);
//         //   fs.writeFileSync(__basedir + "/public/uploads/" + img.name, img.data);
//         // });
//       }
//       console.log("result : ", result);
//       if (!result) {
//         return res.status(500).send("no product in request");
//       } else {
//         res.json(result);
//         res.send(`update data Successfully`);
//       }
//     }
//     // result = await ProductImages.update(
//     //   { images: imageData },
//     //   { where: { id: _id } }
//     // );
//   } catch (e) {
//     console.log("e", e);
//   }
//   // const Pdtresult = await Products.update(files.length(), {
//   //   where: { id: _id },
//   // });
//   // res.json(Pdtresult);
//   //console.log("imagePaths", imagePaths);
//   // const result = await ProductImages.update(
//   //   //imagePaths,
//   //   { images: imagePaths },
//   //   { where: { id: _id } }
//   // );
// }

//PRODUCT IMAGES
// async function productImages(req, res) {
//   let _id = req.params.id;
//   console.log("request___files", req);

//   let files = req.files;
//   console.log("files", files);
//   let baseURL = `${req.protocol}://${req.get("host")}/public/uploads/`;
//   try {
//     let result;
//     if (files) {
//       for (let i = 0; i < files.length; i++) {
//         console.log(i, "here===>");
//         each = files[i].filename;
//         console.log("each", each);
//         let updateProductImage = {
//           product_id: _id,
//           product_images: `${baseURL}${each}`,
//         };
//         result = await ProductImages.create(updateProductImage);

//         res.status(200).send(`update data Successfully`);
//       }
//     }
//   } catch (e) {
//     console.log("e", e);
//     return res.status(500).send("no product in request");
//   }
// }
