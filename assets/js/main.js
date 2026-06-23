/* Skeepers — Client Training : interactions de démonstration */
(function () {
  "use strict";

  // Année dynamique dans le footer
  document.querySelectorAll("#year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // --- Fiche produit : galerie + swatches ---
  var thumbs = document.querySelectorAll(".product-thumbs div");
  var mainImg = document.getElementById("mainImg");
  thumbs.forEach(function (t) {
    t.addEventListener("click", function () {
      thumbs.forEach(function (x) { x.classList.remove("active"); });
      t.classList.add("active");
      if (mainImg) mainImg.textContent = t.dataset.emoji || t.textContent;
    });
  });

  document.querySelectorAll(".swatches").forEach(function (group) {
    group.querySelectorAll(".swatch").forEach(function (sw) {
      sw.addEventListener("click", function () {
        group.querySelectorAll(".swatch").forEach(function (x) { x.classList.remove("active"); });
        sw.classList.add("active");
      });
    });
  });

  // --- Panier : quantités, suppression, code promo ---
  var cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  var promoApplied = false;

  function formatEUR(n) {
    return n.toFixed(2).replace(".", ",") + " €";
  }

  function recalc() {
    var subtotal = 0;
    var count = 0;
    cartItems.querySelectorAll(".cart-item").forEach(function (item) {
      var price = parseFloat(item.dataset.price);
      var qty = parseInt(item.querySelector(".q").textContent, 10);
      var line = price * qty;
      subtotal += line;
      count += qty;
      item.querySelector(".item-price").textContent = formatEUR(line);
    });

    var discount = promoApplied ? subtotal * 0.1 : 0;
    var shipping = subtotal >= 35 || subtotal === 0 ? 0 : 4.9;
    var total = subtotal - discount + shipping;

    setText("subtotal", formatEUR(subtotal));
    setText("discount", "– " + formatEUR(discount));
    setText("shipping", shipping === 0 ? "Offerte" : formatEUR(shipping));
    setText("total", formatEUR(total));
    setText("cartCount", String(count));

    if (cartItems.children.length === 0) {
      cartItems.innerHTML =
        '<div class="empty-hint">Votre panier est vide.<br>' +
        '<a class="btn btn-primary" href="purchase.html" style="margin-top:14px">Découvrir nos produits</a></div>';
    }
  }

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  cartItems.addEventListener("click", function (e) {
    var item = e.target.closest(".cart-item");
    if (!item) return;
    var act = e.target.dataset.act;
    var qEl = item.querySelector(".q");

    if (act === "inc") {
      qEl.textContent = parseInt(qEl.textContent, 10) + 1;
    } else if (act === "dec") {
      var q = parseInt(qEl.textContent, 10);
      if (q > 1) qEl.textContent = q - 1;
    } else if (e.target.classList.contains("remove")) {
      item.remove();
    }
    recalc();
  });

  var applyBtn = document.getElementById("applyPromo");
  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      var code = (document.getElementById("promoCode").value || "").trim().toUpperCase();
      var msg = document.getElementById("promoMsg");
      if (code === "SKEEPERS10") {
        promoApplied = true;
        msg.textContent = "✓ Code appliqué : -10 %";
        msg.style.color = "var(--skp-green)";
      } else {
        promoApplied = false;
        msg.textContent = code ? "Code invalide." : "";
        msg.style.color = "var(--skp-coral)";
      }
      recalc();
    });
  }

  recalc();
})();
