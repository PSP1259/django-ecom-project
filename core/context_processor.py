from ast import Add
from core.models import Product, Category, Vendor, CartOrder, ProductImages, ProductReview, wishlist_model, Address
from django.db.models import Min, Max
from django.contrib import messages

def default(request):
    categories = Category.objects.all()
    vendors = Vendor.objects.all()

    min_max_price = Product.objects.aggregate(Min("price"), Max("price"))

    if request.user.is_authenticated:
        try:
            wishlist = wishlist_model.objects.filter(user=request.user)
        except:
            messages.warning(request, "You need to login before accessing your wishlist.")
            wishlist = 0
    else:
        wishlist = 0

    
    
    try:
        address = Address.objects.get(user=request.user)
    except:
        address = None

    cart_data_obj = request.session.get("cart_data_obj", {})
    mini_cart_total = 0.0
    for item in cart_data_obj.values():
        try:
            mini_cart_total += int(item.get("qty", 0)) * float(item.get("price", 0))
        except (TypeError, ValueError):
            continue

    mini_cart_items = list(cart_data_obj.items())[:4]

    return {
        'categories':categories,
        'wishlist':wishlist,
        'address':address,
        'vendors':vendors,
        'min_max_price':min_max_price,
        'mini_cart_items': mini_cart_items,
        'mini_cart_total': mini_cart_total,
    }
  
