$(()=> {
    $(".devour").on("click", (event) => {
        const id = $(this).data("id");
        const update = { devoured: true };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: update
        }).then( function() {
            location.reload();
        });
    })

    
    $(".delete").on("click", (event) => {
        const id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then( function() {
            location.reload();
        });
    })

   
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
        })
});