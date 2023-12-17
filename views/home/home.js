//Redireciona do ORÇAMENTO para o WHATSAPP----------------------------------------------------------------------
let footerLinks = document.querySelectorAll('.zapLink');
let cell = '5513997420039';
let msg = 'Olá, encontrei vocês no site e gostaria de mais detalhes.';
let target = $PC() ? `https://api.whatsapp.com/send?phone=` : target = `whatsapp://send?phone=`;
target += `${cell}&text=${encodeURIComponent(msg)}`;

footerLinks.forEach(z =>
{
    z.href = target;
});

z7rems('lista-nome');