# Django ecom: Updated Project README

> Last refresh: 2026-03-06

## Overview

- App type: Django-based e-commerce monolith with server-rendered templates and AJAX endpoints.
- Backend core: `core` app (catalog, cart, checkout, wishlist, dashboard).
- Auth core: `userauths` app with custom email-login user model.
- Payments: Stripe Checkout + PayPal IPN route integration.
- Storage/runtime: SQLite by default, optional DB URL, optional S3 media storage.
- Frontend: theme assets under `static/assets` + project JS in `static/assets/js/function.js`.

## Frontend / Backend split

### Backend
- URL routing via `ecom/urls.py`, `core/urls.py`, `userauths/urls.py`.
- Business logic in `core/views.py` and `userauths/views.py`.
- Data models in `core/models.py` and `userauths/models.py`.
- Runtime config from `.env` consumed in `ecom/settings.py` via `environs`.
- Middleware includes WhiteNoise for static serving in deployment.

### Frontend
- Main layout shell: `templates/partials/base.html`.
- Page templates grouped in `templates/core`, `templates/userauths`, `templates/useradmin`.
- AJAX partials in `templates/core/async`.
- Theme/vendor assets in `static/assets`.
- Custom AJAX/cart/wishlist behavior in `static/assets/js/function.js`.

## Runtime/Deployment notes

- `.env` contains secrets and must never be committed.
- `.env.example` is the canonical variable template.
- `Procfile` exists: web: gunicorn ecom.wsgi --log-file -
- `DATABASES` uses `dj_database_url.config(...)` in settings; ensure dependency/import alignment in runtime.
- Optional S3 storage block is activated when `AWS_ACCESS_KEY_ID` exists.

## Top-level structure

| Path | Purpose | Files |
|---|---|---:|
| `.env` | Runtime environment file | 1 |
| `.env.example` | Environment template | 1 |
| `.gitattributes` | Git attributes | 1 |
| `.gitignore` | Git ignore rules | 1 |
| `Procfile` | Deployment process file | 1 |
| `README.md` | Project documentation | 1 |
| `Ztemplate` | Archived/reference templates | 22 |
| `core` | Main commerce app | 37 |
| `db.sqlite3` | Main local DB | 1 |
| `db.sqlite3.bak_20260220_111716` | DB backup | 1 |
| `db.sqlite3.bak_before_table_rename_20260220_111837` | DB backup | 1 |
| `ecom` | Project config package | 15 |
| `manage.py` | Django command entrypoint | 1 |
| `media` | Uploaded media | 30 |
| `requirements.txt` | Dependencies | 1 |
| `static` | Static frontend assets | 358 |
| `templates` | SSR templates | 40 |
| `userauths` | Auth/profile app | 16 |

## Setup quickstart

1. Create virtualenv and activate it.
2. `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and fill keys.
4. `python manage.py migrate`
5. `python manage.py createsuperuser` (optional)
6. `python manage.py runserver`

## URL map (high-level)

- `/admin/` -> Django admin
- `/` -> storefront routes (`core`) 
- `/user/` -> auth/profile routes (`userauths`)
- `/ckeditor/` -> CKEditor endpoints
- `/products/*`, `/cart/*`, `/checkout/*`, `/wishlist/*` -> commerce flow

## Deep dive: file by file

> Scope: all files except `__pycache__` and `*.pyc`.

| File | Type | Description |
|---|---|---|
| `.env` | Environment Config | Local runtime environment variables (contains secrets, do not commit). |
| `.env.example` | Environment Config | Safe template for required environment variables. |
| `.gitattributes` | Project Meta | Line ending normalization policy for Git checkout/commit. |
| `.gitignore` | Project Meta | Ignore rules for runtime artifacts, secrets, DB/media, editor files. |
| `Procfile` | Project File | Deployment process definition file (currently empty placeholder). |
| `README.md` | Project File | Primary handover document (this file). |
| `Ztemplate/Admin/base.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/blank-page-builder.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/dashboard.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/order-detail.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/order-list.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/product-create.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/product-list.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/reviews.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/seller-profile.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/settings.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/Admin/transactions.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/cart.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/change_password.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/checkout.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/dashboard.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/order_detail.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/orders.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/payment-success.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/products.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/reviews.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/settings.html` | Django Template | Archived/reference template file kept as design source material. |
| `Ztemplate/MainTemplate/shop_page.html` | Django Template | Archived/reference template file kept as design source material. |
| `core/__init__.py` | Python | Core app package marker. |
| `core/admin.py` | Python | Django admin setup for core models. |
| `core/apps.py` | Python | Core app config. |
| `core/context_processor.py` | Python | Global template context injector (categories/vendors/wishlist/minicart metadata). |
| `core/forms.py` | Python | Core forms (review submission form). |
| `core/migrations/0001_initial.py` | Python | Core schema migration step. |
| `core/migrations/0002_auto_20221017_1407.py` | Python | Core schema migration step. |
| `core/migrations/0003_product_vendor.py` | Python | Core schema migration step. |
| `core/migrations/0004_alter_product_category.py` | Python | Core schema migration step. |
| `core/migrations/0005_auto_20221017_1548.py` | Python | Core schema migration step. |
| `core/migrations/0006_vendor_cover_image.py` | Python | Core schema migration step. |
| `core/migrations/0007_alter_productimages_product.py` | Python | Core schema migration step. |
| `core/migrations/0008_auto_20221018_1600.py` | Python | Core schema migration step. |
| `core/migrations/0009_product_tags.py` | Python | Core schema migration step. |
| `core/migrations/0010_auto_20221020_0948.py` | Python | Core schema migration step. |
| `core/migrations/0011_auto_20221101_1701.py` | Python | Core schema migration step. |
| `core/migrations/0012_auto_20221106_2355.py` | Python | Core schema migration step. |
| `core/migrations/0013_rename_wishlist_wishlist_model.py` | Python | Core schema migration step. |
| `core/migrations/0014_auto_20221116_1951.py` | Python | Core schema migration step. |
| `core/migrations/0015_rename_pid_cartorder_sku.py` | Python | Core schema migration step. |
| `core/migrations/0016_alter_cartorder_sku.py` | Python | Core schema migration step. |
| `core/migrations/0017_alter_product_description_and_more.py` | Python | Core schema migration step. |
| `core/migrations/0018_cartorder_address_cartorder_city_cartorder_country_and_more.py` | Python | Core schema migration step. |
| `core/migrations/0019_cartorder_oid_cartorder_shipping_method_and_more.py` | Python | Core schema migration step. |
| `core/migrations/0020_cartorder_date.py` | Python | Core schema migration step. |
| `core/migrations/0021_cartorder_email_cartorder_full_name_cartorder_phone.py` | Python | Core schema migration step. |
| `core/migrations/0022_cartorder_stripe_payment_intent.py` | Python | Core schema migration step. |
| `core/migrations/0023_alter_cartorder_paid_status.py` | Python | Core schema migration step. |
| `core/migrations/0024_coupon.py` | Python | Core schema migration step. |
| `core/migrations/0025_cartorder_coupons.py` | Python | Core schema migration step. |
| `core/migrations/0026_cartorder_saved.py` | Python | Core schema migration step. |
| `core/migrations/0027_alter_cartorderproducts_options_and_more.py` | Python | Core schema migration step. |
| `core/migrations/__init__.py` | Python | Core migration package initializer. |
| `core/models.py` | Python | Commerce domain models (catalog, orders, cart items, review, wishlist, address, coupon). |
| `core/tests.py` | Python | Core tests placeholder. |
| `core/urls.py` | Python | Core app route map. |
| `core/views.py` | Python | Core page/API handlers (catalog, cart, checkout, dashboard, wishlist, contact). |
| `db.sqlite3` | Data/Backup | Local development database. |
| `db.sqlite3.bak_20260220_111716` | Project File | Database backup snapshot. |
| `db.sqlite3.bak_before_table_rename_20260220_111837` | Project File | Backup snapshot before schema/table rename work. |
| `ecom/__init__.py` | Python | Project package marker. |
| `ecom/asgi.py` | Python | ASGI app entrypoint. |
| `ecom/migrations_ipn/0001_initial.py` | Python | PayPal IPN migration step (django-paypal override path). |
| `ecom/migrations_ipn/0002_paypalipn_mp_id.py` | Python | PayPal IPN migration step (django-paypal override path). |
| `ecom/migrations_ipn/0003_auto_20141117_1647.py` | Python | PayPal IPN migration step (django-paypal override path). |
| `ecom/migrations_ipn/0004_auto_20150612_1826.py` | Python | PayPal IPN migration step (django-paypal override path). |
| `ecom/migrations_ipn/0005_auto_20151217_0948.py` | Python | PayPal IPN migration step (django-paypal override path). |
| `ecom/migrations_ipn/0006_auto_20160108_1112.py` | Python | PayPal IPN migration step (django-paypal override path). |
| `ecom/migrations_ipn/0007_auto_20160219_1135.py` | Python | PayPal IPN migration step (django-paypal override path). |
| `ecom/migrations_ipn/0008_auto_20181128_1032.py` | Python | PayPal IPN migration step (django-paypal override path). |
| `ecom/migrations_ipn/0009_alter_paypalipn_id.py` | Python | PayPal IPN migration step (django-paypal override path). |
| `ecom/migrations_ipn/__init__.py` | Python | PayPal IPN migration package initializer. |
| `ecom/settings.py` | Python | Global settings: env loading, apps, middleware, DB config, auth, static/media, payments, optional S3. |
| `ecom/urls.py` | Python | Root URL router: admin + core + userauths + ckeditor routes. |
| `ecom/wsgi.py` | Python | WSGI app entrypoint. |
| `manage.py` | Python | Django management command entrypoint. |
| `media/category/product-6-2.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/category/thumbnail-3.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/cat-4.png` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/cat-5.png` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/product-14-2.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/product-16-7.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/product-16-7_2W1KdF5.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/product-16-7_9hvNfcr.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/product-16-7_GsIbebG.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/product-9-1.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/product-9-1_i941gly.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/product-9-1_jxfKBnU.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/thumbnail-1.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/thumbnail-6.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/thumbnail-6_OxWyRFM.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/thumbnail-6_biQniDN.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/product-images/thumbnail-6_fHzcBq4.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_1/2C6A7125.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_1/product-11-2.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_1/thumbnail-11.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_1/thumbnail-11_Y34Gj9C.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_1/thumbnail-11_l6a4IiH.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_1/thumbnail-11_s2WAmm5.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_1/thumbnail-4.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_1/vendor-1.png` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_1/vendor-header-bg.png` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_3/product-12-1.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_3/thumbnail-7.jpg` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_3/vendor-header-bg.png` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `media/user_3/vendor-header-bg_cyiZfoX.png` | Image Asset | Runtime uploaded media file (generated by ImageField uploads). |
| `requirements.txt` | Data/Backup | Pinned Python dependency list used for install/deploy. |
| `static/assets/css/main.css` | CSS | Compiled main CSS for storefront. |
| `static/assets/css/plugins/magnific-popup.css` | CSS | Plugin CSS file. |
| `static/assets/css/plugins/perfect-scrollbar.css` | CSS | Plugin CSS file. |
| `static/assets/css/plugins/select2.min.css` | CSS | Plugin CSS file. |
| `static/assets/css/plugins/slick.css` | CSS | Plugin CSS file. |
| `static/assets/css/plugins/slider-range.css` | CSS | Plugin CSS file. |
| `static/assets/css/prism.css` | CSS | Theme CSS file. |
| `static/assets/css/vendors/bootstrap.min.css` | CSS | Vendor CSS file. |
| `static/assets/css/vendors/dist/css/bootstrap.css` | CSS | Vendor CSS file. |
| `static/assets/css/vendors/normalize.css` | CSS | Vendor CSS file. |
| `static/assets/css/vendors/uicons-regular-straight.css` | CSS | Vendor CSS file. |
| `static/assets/fonts/uicons/uicons-regular-straight.woff2` | Font Asset | Font asset used by icon/type styles. |
| `static/assets/imgs/banner/banner-1.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-10.jpg` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-10.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-11.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-13.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-14.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-15.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-16.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-17.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-18.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-19.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-2.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-3.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-5.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-6.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-7.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-8.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-9.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/banner-menu.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/banner/fillter-widget-bg.png` | Image Asset | Image asset in frontend group `banner`. |
| `static/assets/imgs/blog/header-bg.png` | Image Asset | Image asset in frontend group `blog`. |
| `static/assets/imgs/page/about-1.png` | Image Asset | Image asset in frontend group `page`. |
| `static/assets/imgs/page/about-2.png` | Image Asset | Image asset in frontend group `page`. |
| `static/assets/imgs/page/about-3.png` | Image Asset | Image asset in frontend group `page`. |
| `static/assets/imgs/page/about-4.png` | Image Asset | Image asset in frontend group `page`. |
| `static/assets/imgs/page/about-5.png` | Image Asset | Image asset in frontend group `page`. |
| `static/assets/imgs/page/about-6.png` | Image Asset | Image asset in frontend group `page`. |
| `static/assets/imgs/page/about-8.png` | Image Asset | Image asset in frontend group `page`. |
| `static/assets/imgs/page/login-1.png` | Image Asset | Image asset in frontend group `page`. |
| `static/assets/imgs/shop/cat-1.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-11.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-12.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-13.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-14.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-15.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-2.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-3.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-4.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-5.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/cat-9.png` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-1-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-1-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-10-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-10-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-11-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-11-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-12-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-12-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-13-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-13-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-14-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-14-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-15-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-15-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-16-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-16-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-16-3.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-16-4.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-16-5.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-16-6.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-16-7.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-2-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-2-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-3-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-3-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-4-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-4-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-5-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-5-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-6-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-6-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-7-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-7-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-8-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-8-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-9-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/product-9-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-1.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-10.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-11.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-12.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-2.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-3.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-4.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-5.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-6.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-7.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-8.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/shop/thumbnail-9.jpg` | Image Asset | Image asset in frontend group `shop`. |
| `static/assets/imgs/slider/slider-1.png` | Image Asset | Image asset in frontend group `slider`. |
| `static/assets/imgs/slider/slider-2.png` | Image Asset | Image asset in frontend group `slider`. |
| `static/assets/imgs/slider/slider-7.png` | Image Asset | Image asset in frontend group `slider`. |
| `static/assets/imgs/slider/slider-8.png` | Image Asset | Image asset in frontend group `slider`. |
| `static/assets/imgs/theme/app-store.jpg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/favicon.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/flag-dt.png` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/flag-fr.png` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/flag-ru.png` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/google-play.jpg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-1.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-10.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-11.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-2.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-3.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-4.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-5.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-6.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-7.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-8.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/category-9.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-1.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-2.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-3.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-4.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-5.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-6.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-cart.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-clock.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-compare.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-contact.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-email-2.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-facebook-brand.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-facebook-white.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-headphone-white.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-headphone.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-heart.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-hot-white.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-hot.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-instagram-brand.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-instagram-white.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-location.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-pinterest-white.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-plane.png` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-twitter-brand.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-twitter-white.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-user.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-youtube-brand.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/icon-youtube-white.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/phone-call.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/social-fb.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/social-insta.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/social-pin.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/icons/social-tw.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/loading.gif` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/logo.svg` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/payment-method.png` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/rating-stars.png` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/theme/wave.png` | Image Asset | Image asset in frontend group `theme`. |
| `static/assets/imgs/vendor/vendor-1.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/imgs/vendor/vendor-10.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/imgs/vendor/vendor-17.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/imgs/vendor/vendor-2.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/imgs/vendor/vendor-3.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/imgs/vendor/vendor-4.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/imgs/vendor/vendor-7.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/imgs/vendor/vendor-8.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/imgs/vendor/vendor-9.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/imgs/vendor/vendor-header-bg.png` | Image Asset | Image asset in frontend group `vendor`. |
| `static/assets/js/function.js` | JavaScript | Custom frontend behavior for AJAX cart/wishlist/filter/review/contact actions. |
| `static/assets/js/index.umd.js` | JavaScript | Project/theme JavaScript asset. |
| `static/assets/js/main.js` | JavaScript | Theme-level frontend interactions. |
| `static/assets/js/plugins/counterup.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/images-loaded.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/isotope.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/jquery.countdown.min.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/jquery.elevatezoom.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/jquery.syotimer.min.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/jquery.theia.sticky.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/jquery.vticker-min.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/magnific-popup.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/perfect-scrollbar.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/scrollup.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/select2.min.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/slick.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/slider-range.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/waypoints.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/plugins/wow.js` | JavaScript | Theme plugin JavaScript file. |
| `static/assets/js/prism.js` | JavaScript | Project/theme JavaScript asset. |
| `static/assets/js/shop.js` | JavaScript | Product/gallery interactions for shop pages. |
| `static/assets/js/src/alert.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/base-component.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/button.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/carousel.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/collapse.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/dom/data.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/dom/event-handler.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/dom/manipulator.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/dom/selector-engine.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/dropdown.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/modal.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/popover.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/scrollspy.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/tab.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/toast.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/tooltip.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/util/index.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/src/util/sanitizer.js` | JavaScript | Bootstrap source JavaScript module. |
| `static/assets/js/vendor/bootstrap.bundle.min.js` | JavaScript | Third-party vendor JS library asset. |
| `static/assets/js/vendor/jquery-3.6.0.min.js` | JavaScript | Third-party vendor JS library asset. |
| `static/assets/js/vendor/jquery-migrate-3.3.0.min.js` | JavaScript | Third-party vendor JS library asset. |
| `static/assets/js/vendor/modernizr-3.6.0.min.js` | JavaScript | Third-party vendor JS library asset. |
| `static/assets/node_modules/@popperjs/core/lib/createPopper.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/contains.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getNodeName.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getParentNode.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getWindow.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/instanceOf.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/isTableElement.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/enums.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/modifiers/applyStyles.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/modifiers/arrow.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/modifiers/computeStyles.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/modifiers/eventListeners.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/modifiers/flip.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/modifiers/hide.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/modifiers/offset.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/modifiers/popperOffsets.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/modifiers/preventOverflow.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/popper-lite.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/popper.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/computeOffsets.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/debounce.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/detectOverflow.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/expandToHashMap.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/getAltAxis.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/getBasePlacement.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/getFreshSideObject.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/getOppositePlacement.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/getVariation.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/mergeByName.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/mergePaddingObject.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/orderModifiers.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/rectToClientRect.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/node_modules/@popperjs/core/lib/utils/within.js` | JavaScript | Project file (supporting/config/runtime artifact). |
| `static/assets/sass/abstracts/_functions.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/abstracts/_mixins.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/abstracts/_variables.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/base/_animation.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/base/_common.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/base/_typography.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/components/_banners.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/components/_buttons.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/components/_card.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/components/_form.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/components/_misc.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/components/_slider.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/components/_tabs.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/layout/_footer.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/layout/_header.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/layout/_navigation.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/layout/_responsive.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/layout/_sidebar.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/layout/_spacing.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/main.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/pages/_blog.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/pages/_invoice.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/pages/_page.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/pages/_print.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/pages/_shop.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/pages/_vendors.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/themes/_default.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/sass/vendors/_vendors-import.scss` | Sass/SCSS | SASS source layer for theme styling. |
| `static/assets/scss/_accordion.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_alert.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_badge.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_breadcrumb.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_button-group.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_buttons.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_card.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_carousel.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_close.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_containers.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_dropdown.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_grid.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_images.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_list-group.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_modal.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_nav.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_navbar.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_pagination.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_popover.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_progress.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_reboot.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_root.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_spinners.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_tables.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_toasts.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_tooltip.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_transitions.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/_type.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/bootstrap.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/forms/_floating-labels.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/forms/_form-check.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/forms/_form-control.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/forms/_form-range.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/forms/_form-select.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/forms/_form-text.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/forms/_input-group.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/forms/_labels.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/helpers/_colored-links.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/helpers/_position.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/helpers/_ratio.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/helpers/_stretched-link.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/helpers/_text-truncation.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/helpers/_visually-hidden.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_alert.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_border-radius.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_breakpoints.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_buttons.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_caret.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_clearfix.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_container.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_forms.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_gradients.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_grid.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_image.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_list-group.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_lists.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_pagination.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_reset-text.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_table-variants.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_text-truncate.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_transition.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_utilities.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/mixins/_visually-hidden.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/utilities/_api.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `static/assets/scss/vendor/_rfs.scss` | Sass/SCSS | SCSS source layer for Bootstrap/custom styling. |
| `templates/core/about_us.html` | Django Template | Core page template. |
| `templates/core/async/cart-list.html` | Django Template | Async partial template used for AJAX HTML replacement. |
| `templates/core/async/product-list.html` | Django Template | Async partial template used for AJAX HTML replacement. |
| `templates/core/async/wishlist-list.html` | Django Template | Async partial template used for AJAX HTML replacement. |
| `templates/core/cart.html` | Django Template | Core page template. |
| `templates/core/category-list.html` | Django Template | Core page template. |
| `templates/core/category-product-list.html` | Django Template | Core page template. |
| `templates/core/checkout.html` | Django Template | Core page template. |
| `templates/core/contact.html` | Django Template | Core page template. |
| `templates/core/dashboard.html` | Django Template | Core page template. |
| `templates/core/index.html` | Django Template | Core page template. |
| `templates/core/order-detail.html` | Django Template | Core page template. |
| `templates/core/payment-completed.html` | Django Template | Core page template. |
| `templates/core/payment-failed.html` | Django Template | Core page template. |
| `templates/core/privacy_policy.html` | Django Template | Core page template. |
| `templates/core/product-detail.html` | Django Template | Core page template. |
| `templates/core/product-list.html` | Django Template | Core page template. |
| `templates/core/purchase_guide.html` | Django Template | Core page template. |
| `templates/core/search.html` | Django Template | Core page template. |
| `templates/core/tag.html` | Django Template | Core page template. |
| `templates/core/terms_of_service.html` | Django Template | Core page template. |
| `templates/core/vendor-detail.html` | Django Template | Core page template. |
| `templates/core/vendor-list.html` | Django Template | Core page template. |
| `templates/core/wishlist.html` | Django Template | Core page template. |
| `templates/partials/base.html` | Django Template | Global layout shell (header, nav, footer, scripts, mini cart dropdown). |
| `templates/useradmin/add-products.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/base.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/change_password.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/dashboard.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/edit-products.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/order_detail copy.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/order_detail.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/orders.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/products.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/reviews.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/settings.html` | Django Template | Seller/admin dashboard template. |
| `templates/useradmin/shop_page.html` | Django Template | Seller/admin dashboard template. |
| `templates/userauths/profile-edit.html` | Django Template | Auth/profile template. |
| `templates/userauths/sign-in.html` | Django Template | Auth/profile template. |
| `templates/userauths/sign-up.html` | Django Template | Auth/profile template. |
| `userauths/__init__.py` | Python | Userauths package marker. |
| `userauths/admin.py` | Python | Admin registration for auth-related models. |
| `userauths/apps.py` | Python | Userauths app config. |
| `userauths/forms.py` | Python | Auth and profile forms. |
| `userauths/migrations/0001_initial.py` | Python | Userauths schema migration step. |
| `userauths/migrations/0002_user_bio.py` | Python | Userauths schema migration step. |
| `userauths/migrations/0003_contactus.py` | Python | Userauths schema migration step. |
| `userauths/migrations/0004_auto_20221109_1648.py` | Python | Userauths schema migration step. |
| `userauths/migrations/0005_profile_user.py` | Python | Userauths schema migration step. |
| `userauths/migrations/0006_profile_address_profile_country.py` | Python | Userauths schema migration step. |
| `userauths/migrations/0007_alter_profile_address_alter_profile_country_and_more.py` | Python | Userauths schema migration step. |
| `userauths/migrations/__init__.py` | Python | Userauths migration package initializer. |
| `userauths/models.py` | Python | Custom user model + profile + contact model + profile creation signal. |
| `userauths/tests.py` | Python | Userauths tests placeholder. |
| `userauths/urls.py` | Python | Auth route map. |
| `userauths/views.py` | Python | Auth/profile view functions (register/login/logout/profile update). |

## Known gaps / TODO

- `Procfile` web: gunicorn ecom.wsgi --log-file -
- Test modules exist but contain little/no real automated coverage.
- Project contains both custom code and many third-party static assets; upgrades should isolate custom overrides.