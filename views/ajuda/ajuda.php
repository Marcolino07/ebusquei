<section id="tela-interface">
    <h1>INTERFACE DE ADIÇÃO DE PRODUTOS</h1>

    <div class='x2'>
        <p>
            <label for="produto">Produto:</label>
            <input class="z7-alfa" id="produto" name="produto" type="text" placeholder='Nome do produto' required/>
        </p>
        <p>
            <label for="valor">Valor:</label>
            <input class="z7-" id="valor" name="valor" type="text" placeholder='Valor do produto' required/>
        </p>
    </div>

    <div class='x2'>
        <p>
            <label for="marca">Marca:</label>
            <input class="z7-alfa" id="marca" name="marca" type="text" placeholder='Marca do produto' required/>
        </p>

        <div>
            <label for="mercado">Mercado:</label>
            <select name="mercado" id="mercado">
                <option selected hidden value>Selecione um Mercado</option>
                <option value="Atacadão">Atacadão</option>
                <option value="Mercadão">Mercadão</option>
                <option value="Tenda">Tenda</option>
            </select>
        </div>
    </div>

    <button class="btn btn-next" id="btn-interface" value="" type="button">SALVAR PRODUTO</button>
</section>