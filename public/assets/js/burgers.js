$(() => {
        // Devour button code for each burger on the menu
        $(".devour").on("click", function (event) {
            const id = $(this).data("id");
            const update = { devoured: true };

            $.ajax("/api/burgers/" + id, {
                type: "PUT",
                data: update
            }).then(() => {
                location.reload();
            });
        });

        // Delete button code for each burger on the menu
        $(".delete").on("click", function (event) {
            const id = $(this).data("id");

            $.ajax("/api/burgers/" + id, {
                type: "DELETE"
            }).then(() => {
                location.reload();
            });
        });

        // Submit button code for new burger form
        $(".create").on("submit", (event) => {
            event.preventDefault();

            const newBurger = {
                burger_name: $("#burger").val().trim(),
                devoured: 0
            };
            console.log(newBurger);

            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(() => {
                console.log("created new burger");
                location.reload();
            });
        });
    });