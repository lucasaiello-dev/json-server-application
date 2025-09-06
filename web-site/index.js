let defaultUrl = "http://localhost:8080/products"

async function list() {
    try {
        const req = await fetch(defaultUrl)
        const data = await req.json()
        div_result.innerHTML = ``
        data.forEach(element => 
            div_result.innerHTML += `<p>${element.id} | Nome: ${element.name} | Tamanho: ${element.size} | Preço: ${element.price} | Estoque: ${element.storage}</p>`
        )
    } catch {
        div_result.innerHTML = '<p>Houve um erro ao buscar os produtos, tente novamente.</p>'
    }
}

async function listById() {
    try {
        const id = Number(input_id.value)

        const req = await fetch(`${defaultUrl}/${id}`)
        const data = await req.json()
        div_result.innerHTML = `<p>${data.id} | Nome: ${data.name} | Tamanho: ${data.size} | Preço: ${data.price} | Estoque: ${data.storage}</p>`
    } catch {
        div_result.innerHTML = '<p>Houve um erro ao buscar o produto, tente novamente.</p>'
    }
}

async function create() {
    try {
        const id = Number(input_id.value)
        if (id != 0) {
            alert("Para cadastrar um produto, não preencha o campo Id!")
            return
        }
        const name = input_name.value
        const size = select_size.value
        const price = Number(input_price.value)
        const storage = input_storage.value

        const req = await fetch(defaultUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, size, price, storage})
        })

        if (req.ok) {
            div_result.innerHTML = '<p>Produto cadastrado com sucesso!</p>';
        } else {
            div_result.innerHTML = `<p>Erro ao cadastrar produto. Status: ${req.status}</p>`;
        }

        setTimeout(list, 2000);
    } catch {
        div_result.innerHTML = '<p>Houve um erro ao cadastrar o produto, tente novamente.</p>'
    }
}

async function updateById() {
    try {
        const id = Number(input_id.value)
        const name = input_name.value
        const size = select_size.value
        const price = Number(input_price.value)
        const storage = input_storage.value

        const req = await fetch(`${defaultUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                size,
                price,
                storage
            })
        })

        if (req.ok) {
            div_result.innerHTML = '<p>Produto atualizado com sucesso!</p>';
        } else {
            div_result.innerHTML = `<p>Erro ao atualizar produto. Status: ${req.status}</p>`;
        }
        setTimeout(list, 2000);
    } catch {
        div_result.innerHTML = '<p>Houve um erro ao atualizar o produto, tente novamente.</p>'
    }
}

async function deleteById() {
    try {
        const id = Number(input_id.value)

        const req = await fetch(`${defaultUrl}/${id}`, {
            method: "DELETE",
        })

        if (req.ok) {
            div_result.innerHTML = '<p>Produto deletado com sucesso!</p>';
        } else {
            div_result.innerHTML = `<p>Erro ao deletar produto. Status: ${req.status}</p>`;
        }
        setTimeout(list, 2000);
    } catch {
        div_result.innerHTML = '<p>Houve um erro ao deletar o produto, tente novamente.</p>'
    }
}