<section id="tela-buscar" class="parallax">
    <h1>
		<span>LISTA DE PRODUTOS</span> &ensp;
	</h1>
	<h2>
		<button class='btn side-left-in' type='button'>
			<div>
				<i class='fas fa-bars'></i><i class='fas fa-arrow-right'></i> Produtos
			</div>
		</button>
		
		<button class='btn side-right-in' type='button'>
			<div>
				Minha Lista <i class='fas fa-arrow-left'></i><i class='fas fa-bars'></i>
			</div>
		</button>
	</h2>

    <input type="hidden" class='btn-next' >

    <div id="dv-mercados">
		<div><img src="/img/lista/mercados/atacadao.png"></div>
		<div><img src="/img/lista/mercados/mercadao.png"></div>
		<div><img src="/img/lista/mercados/tenda.png"></div>
	</div>

    <div id="dv-produtos">
	</div>

    <div id="dv-total">
		<button id='go-m1' nome='Atacadão' go='https://www.atacadao.com.br/' onclick='goMerc(this)'>R$&nbsp;<span id='merc-1'>0,00</span></button>
		<button id='go-m2' nome='Mercadão' go='https://www.mercadaoatacadista.com.br' onclick='goMerc(this)'>R$&nbsp;<span id='merc-2'>0,00</span></button>
		<button id='go-m3' nome='Tenda' go='https://www.tendaatacado.com.br/' onclick='goMerc(this)'>R$&nbsp;<span id='merc-3'>0,00</span></button>
	</div>
</section>








