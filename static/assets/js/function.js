console.log("function.js loaded");

const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

$(document).on("submit", "#commentForm", function (e) {
    e.preventDefault();

    const dt = new Date();
    const time = dt.getDate() + " " + monthNames[dt.getUTCMonth()] + ", " + dt.getFullYear();

    $.ajax({
        data: $(this).serialize(),
        method: $(this).attr("method"),
        url: $(this).attr("action"),
        dataType: "json",
        success: function (res) {
            if (res.bool === true) {
                $("#review-res").html("Review added successfully.");
                $(".hide-comment-form").hide();
                $(".add-review").hide();

                let html = '<div class="single-comment justify-content-between d-flex mb-30">';
                html += '<div class="user justify-content-between d-flex">';
                html += '<div class="thumb text-center">';
                html += '<img src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" alt="" />';
                html += '<a href="#" class="font-heading text-brand">' + res.context.user + "</a>";
                html += "</div>";
                html += '<div class="desc">';
                html += '<div class="d-flex justify-content-between mb-10">';
                html += '<div class="d-flex align-items-center">';
                html += '<span class="font-xs text-muted">' + time + " </span>";
                html += "</div>";

                for (let i = 1; i <= res.context.rating; i += 1) {
                    html += '<i class="fas fa-star text-warning"></i>';
                }

                html += "</div>";
                html += '<p class="mb-10">' + res.context.review + "</p>";
                html += "</div>";
                html += "</div>";
                html += "</div>";

                $(".comment-list").prepend(html);
            }
        }
    });
});

$(document).ready(function () {
    function escapeHtml(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function renderMiniCartDropdown(cartData) {
        const dropdowns = $(".cart-dropdown-wrap.cart-dropdown-hm2").not(".account-dropdown");
        if (!dropdowns.length) {
            return;
        }

        const entries = Object.values(cartData || {});
        if (!entries.length) {
            dropdowns.html(
                "<div class='shopping-cart-footer'>" +
                "<p class='mb-2'>Your cart is empty.</p>" +
                "<div class='shopping-cart-button'><a href='/products/' class='outline'>Shop now</a></div>" +
                "</div>"
            );
            return;
        }

        const previewItems = entries.slice(0, 4);
        let total = 0;
        entries.forEach(function (item) {
            const qty = parseInt(item.qty, 10) || 0;
            const price = parseFloat(item.price) || 0;
            total += qty * price;
        });

        let html = "<ul>";
        previewItems.forEach(function (item) {
            const pid = encodeURIComponent(item.pid || "");
            html += "<li>";
            html += "<div class='shopping-cart-img'><a href='/products/" + pid + "/'><img alt='" + escapeHtml(item.title) + "' src='" + escapeHtml(item.image) + "' /></a></div>";
            html += "<div class='shopping-cart-title'>";
            html += "<h4><a href='/products/" + pid + "/'>" + escapeHtml(item.title) + "</a></h4>";
            html += "<h3><span>" + escapeHtml(item.qty) + " × </span>$" + (parseFloat(item.price) || 0).toFixed(2) + "</h3>";
            html += "</div>";
            html += "</li>";
        });
        html += "</ul>";
        html += "<div class='shopping-cart-footer'>";
        html += "<div class='shopping-cart-total'><h4>Total <span>$" + total.toFixed(2) + "</span></h4></div>";
        html += "<div class='shopping-cart-button'><a href='/cart/' class='outline'>View cart</a></div>";
        html += "</div>";

        dropdowns.html(html);
    }

    function showFloatingAlert(message, type) {
        let container = $("#site-alert-container");

        if (!container.length) {
            $("body").append(
                "<div id='site-alert-container' style='position:fixed;top:100px;right:20px;z-index:9999;max-width:320px;width:calc(100% - 40px);'></div>"
            );
            container = $("#site-alert-container");
        }

        const alert = $(
            "<div class='alert alert-" + escapeHtml(type || "info") + " shadow-sm mb-2' role='alert'>" +
                escapeHtml(message) +
            "</div>"
        );

        container.append(alert);
        setTimeout(function () {
            alert.fadeOut(250, function () {
                $(this).remove();
            });
        }, 2200);
    }

    function setWishlistButtonsActive(productId) {
        $(".add-to-wishlist[data-product-item='" + productId + "']").each(function () {
            const button = $(this);
            button.attr("aria-label", "In Wishlist");
            button.attr("title", "In Wishlist");
            button.html("<i class='fi-rs-heart' style='color:#dc3545;'></i>");
        });
    }

    $(document).on("click", ".filter-checkbox, #price-filter-btn", function () {
        const filterObject = {};
        const minPrice = $("#max_price").attr("min");
        const maxPrice = $("#max_price").val();

        filterObject.min_price = minPrice;
        filterObject.max_price = maxPrice;

        $(".filter-checkbox").each(function () {
            const filterKey = $(this).data("filter");
            filterObject[filterKey] = Array.from(
                document.querySelectorAll("input[data-filter=" + filterKey + "]:checked")
            ).map(function (element) {
                return element.value;
            });
        });

        $.ajax({
            url: "/filter-products/",
            data: filterObject,
            dataType: "json",
            success: function (response) {
                $(".totall-product").hide();
                $("#filtered-product").html(response.data);
            }
        });
    });

    $("#max_price").on("blur", function () {
        let minPrice = $(this).attr("min");
        let maxPrice = $(this).attr("max");
        const currentPrice = $(this).val();

        if (currentPrice < parseInt(minPrice, 10) || currentPrice > parseInt(maxPrice, 10)) {
            minPrice = Math.round(minPrice * 100) / 100;
            maxPrice = Math.round(maxPrice * 100) / 100;

            alert("Price must between $" + minPrice + " and $" + maxPrice);
            $(this).val(minPrice);
            $("#range").val(minPrice);
            $(this).focus();
            return false;
        }

        return true;
    });

    $(document).on("click", ".add-to-cart-btn", function (e) {
        e.preventDefault();

        const thisVal = $(this);
        const index = thisVal.attr("data-index");

        const quantity = $(".product-quantity-" + index).val() || 1;
        const productTitle = $(".product-title-" + index).val();
        const productId = $(".product-id-" + index).val();
        const productPrice = ($(".current-product-price-" + index).first().text() || "").replace(/[^0-9.]/g, "");
        const productPid = $(".product-pid-" + index).val();
        const productImage = $(".product-image-" + index).val();

        if (!productId) {
            return;
        }

        $.ajax({
            url: "/add-to-cart/",
            data: {
                id: productId,
                pid: productPid,
                image: productImage,
                qty: quantity,
                title: productTitle,
                price: productPrice
            },
            dataType: "json",
            success: function (response) {
                thisVal.html("<i class='fas fa-check-circle'></i>");
                $(".cart-items-count").text(response.totalcartitems);
                renderMiniCartDropdown(response.data);
            }
        });
    });

    $(document).on("click", ".delete-product", function (e) {
        e.preventDefault();

        const productId = $(this).attr("data-product");
        const thisVal = $(this);
        const row = thisVal.closest("tr");

        $.ajax({
            url: "/delete-from-cart/",
            data: {
                id: productId
            },
            dataType: "json",
            beforeSend: function () {
                thisVal.hide();
            },
            success: function (response) {
                thisVal.show();
                $(".cart-items-count").text(response.totalcartitems);
                window.location.reload();
            }
        });
    });

    $(document).on("click", ".update-product", function (e) {
        e.preventDefault();

        const productId = $(this).attr("data-product");
        const thisVal = $(this);
        const qtyInput = $(".product-qty-" + productId).first();
        const fallbackQtyInput = $(this).closest("tr").find("input[type='number']").first();
        let productQuantity = qtyInput.val() || fallbackQtyInput.val() || 1;

        if (parseInt(productQuantity, 10) < 1) {
            productQuantity = 1;
        }

        $.ajax({
            url: "/update-cart/",
            data: {
                id: productId,
                qty: productQuantity
            },
            dataType: "json",
            beforeSend: function () {
                thisVal.hide();
            },
            success: function (response) {
                thisVal.show();
                $(".cart-items-count").text(response.totalcartitems);
                window.location.reload();
            }
        });
    });

    $(document).on("click", ".make-default-address", function () {
        const id = $(this).attr("data-address-id");

        $.ajax({
            url: "/make-default-address/",
            data: {
                id: id
            },
            dataType: "json",
            success: function (response) {
                if (response.boolean === true) {
                    $(".check").hide();
                    $(".action_btn").show();
                    $(".check" + id).show();
                    $(".button" + id).hide();
                }
            }
        });
    });

    $(document).on("click", ".add-to-wishlist", function (e) {
        e.preventDefault();

        const productId = $(this).attr("data-product-item");
        const thisVal = $(this);

        $.ajax({
            url: "/add-to-wishlist/",
            data: {
                id: productId
            },
            dataType: "json",
            success: function (response) {
                if (response.bool !== true) {
                    showFloatingAlert("Wunschliste konnte nicht aktualisiert werden.", "danger");
                    return;
                }

                setWishlistButtonsActive(productId);
                $(".wishlist-items-count").text(response.wishlist_count);

                showFloatingAlert("Artikel zur Wunschliste hinzugefugt.", "success");
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    const nextUrl = window.location.pathname + window.location.search;
                    window.location.href = "/user/sign-in/?next=" + encodeURIComponent(nextUrl);
                    return;
                }

                showFloatingAlert("Wunschliste konnte nicht aktualisiert werden.", "danger");
            }
        });
    });

    $(document).on("click", ".delete-wishlist-product", function (e) {
        e.preventDefault();

        const wishlistId = $(this).attr("data-wishlist-product");

        $.ajax({
            url: "/remove-from-wishlist/",
            data: {
                id: wishlistId
            },
            dataType: "json",
            success: function (response) {
                $("#wishlist-list").html(response.data);
            }
        });
    });

    $(document).on("submit", "#contact-form-ajax", function (e) {
        e.preventDefault();

        const fullName = $("#full_name").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const subject = $("#subject").val();
        const message = $("#message").val();

        $.ajax({
            url: "/ajax-contact-form/",
            data: {
                full_name: fullName,
                email: email,
                phone: phone,
                subject: subject,
                message: message
            },
            dataType: "json",
            success: function () {
                $(".contact_us_p").hide();
                $("#contact-form-ajax").hide();
                $("#message-response").html("Message sent successfully.");
            }
        });
    });
});
