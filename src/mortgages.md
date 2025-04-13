To **link Bootstrap CSS/JS and icons** from your **local resource folder**, follow these simple steps:

---

### 🛠️ 1. **Download Bootstrap Files**
Go to the [Bootstrap download page](https://getbootstrap.com/docs/5.3/getting-started/download/) and:

- Download the **compiled CSS and JS** files (not source code).
- Extract it—you’ll get a folder with:
  ```
  /css/bootstrap.min.css
  /js/bootstrap.bundle.min.js
  ```

Place them in your project’s **`resources/`** folder, for example:

```
project/
│
├── index.html
└── resources/
    ├── css/
    │   └── bootstrap.min.css
    ├── js/
    │   └── bootstrap.bundle.min.js
    └── icons/
        └── bootstrap-icons.css
```

---

### 🛠️ 2. **(Optional) Download Bootstrap Icons**
Go to: https://icons.getbootstrap.com  
Download the **Bootstrap Icons** CSS and fonts.

Inside your project, place like this:

```
resources/
├── icons/
│   ├── bootstrap-icons.css
│   └── fonts/
│       ├── bootstrap-icons.woff
│       └── bootstrap-icons.woff2
```

---

### 🔗 3. **Link CSS and JS in HTML**

Here’s how you link them in your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Local Bootstrap Setup</title>

  <!-- Link Bootstrap CSS from resources folder -->
  <link rel="stylesheet" href="resources/css/bootstrap.min.css">

  <!-- Link Bootstrap Icons (optional) -->
  <link rel="stylesheet" href="resources/icons/bootstrap-icons.css">
</head>
<body>

  <!-- Example using Bootstrap class -->
  <div class="container py-5">
    <h1 class="text-primary">Hello from Local Bootstrap!</h1>
    <p><i class="bi bi-house-door-fill"></i> Bootstrap Icons are working!</p>
  </div>

  <!-- Bootstrap JS (bundle includes Popper.js) -->
  <script src="resources/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

### ✅ That’s it!
You’ve now fully integrated Bootstrap and Icons **offline** via the `resources/` folder.

Would you like a ready-made folder structure or ZIP file with everything set up for you? I can help generate that too.
