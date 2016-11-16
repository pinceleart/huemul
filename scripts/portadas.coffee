
# Description:
#   Muestra las portadas de hoy de diversos diarios de Chile.
#
# Dependencies:
#   moment
#
# Configuration:
#   None
#
# Commands:
#   hubot portada <diario>
#
# Diarios Disponibles:
#
# Chile:
#   (la)? segunda
#   (la)? tercera
#   (la)? cuarta
#   (el)? mercurio
#   ((las)? ultimas noticias)|lun
#   publimetro
#
# Uruguay:*
#   (el)? pais (uruguay|uru)
#
# Brasil:
#   (o)? globo
#
# Colombia:
#   (el)? tiempo
#
# Mexico:
#   (el)? financiero
#
# USA
#   ((the)? wall street journal)|wsj
#   (the)? washington post
#   usa today
#
# Francia:
#   (le)? monde
#
# España:
#   (el)? pais
#
# United Kingdom:
#   (the)? times
#
# Italia:
#   (il)? corriere (della sera)?
#
# Author:
#   @rotvulpix

moment = require("moment");
intentos = 0

lista_portadas = (msg) ->
  msg.send """
  *Chile:*
    (la)? segunda
    (la)? tercera
    (la)? cuarta
    (el)? mercurio
    ((las)? ultimas noticias)|lun
    publimetro
  *Uruguay:*
    (el)? pais (uruguay|uru)
  *Brasil:*
    (o)? globo
  *Colombia:*
    (el)? tiempo
  *Mexico:*
    (el)? financiero
  *USA*
    ((the)? wall street journal)|wsj
    (the)? washington post
    usa today
  *Francia:*
    (le)? monde
  *España:*
    (el)? pais
  *United Kingdom:*
    (the)? times
  *Italia:*
    (il)? corriere (della sera)?
  """

format_date = (date, no_slashes = false) ->
  if no_slashes
    date.format 'YYYYMMDD'
  else
    date.format 'YYYY/MM/DD'

get_portada = (msg, diario, days_past = 0) ->
  if days_past > 5
    msg.send "No existe portada de este diario por los últimos 5 días."
  else
    fecha = moment().subtract(days_past, 'days')
    test_url = diario.url.replace("#DATE#", format_date(fecha, diario.no_slashes))
    console.log test_url
    msg.http(test_url).get() (err, res, body) ->
      if res.statusCode == 404
        get_portada(msg, diario, days_past + 1)
      else
        msg.send test_url

module.exports = (robot) ->
  robot.respond /portada (.*)/i, (msg) ->
    nombre = msg.match[1].replace(/^(las |la |el |le |the |o |il )/, "").replace(/( )/g, "")
    diario = switch(nombre)
      # Chile
      when "segunda" then { url: "http://www.portadaschilenas.com/#DATE#/Lasegunda_grande.jpg", no_slashes: false }
      when "tercera" then { url: "http://www.portadaschilenas.com/#DATE#/Latercera_grande.jpg", no_slashes: false }
      when "cuarta" then { url: "http://www.portadaschilenas.com/#DATE#/Lacuarta_grande.jpg", no_slashes: false }
      when "publimetro" then { url: "http://www.portadaschilenas.com/#DATE#/pm_grande.jpg", no_slashes: false }
      when "mercurio" then { url: "http://www.portadaschilenas.com/#DATE#/Emol_grande.jpg", no_slashes: false }
      when "ultimasnoticias" then { url: "http://www.portadaschilenas.com/#DATE#/Lun_grande.jpg", no_slashes: false }
      when "lun" then { url: "http://www.portadaschilenas.com/#DATE#/Lun_grande.jpg", no_slashes: false }

      # Brasil
      when "globo" then { url: "http://img.kiosko.net/#DATE#/br/br_oglobo.750.jpg", no_slashes: false}

      # Colombia
      when "tiempo" then {url: "http://img.kiosko.net/#DATE#/co/co_eltiempo.750.jpg", no_slashes: false}

      # Uruguay
      when "paisuruguay" then {url: "http://www.elpais.com.uy/printed-home/#DATE#/portada_impresa.jpg", no_slashes: true}
      when "paisuru" then {url: "http://www.elpais.com.uy/printed-home/#DATE#/portada_impresa.jpg", no_slashes: true}

      # Mexico
      when "financiero" then {url: "http://img.kiosko.net/#DATE#/mx/mx_financiero.750.jpg", no_slashes: false}

      # USA
      when "wallstreetjournal" then {url: "http://img.kiosko.net/#DATE#/eur/wsj.750.jpg", no_slashes: false}
      when "wsj" then {url: "http://img.kiosko.net/#DATE#/eur/wsj.750.jpg", no_slashes: false}
      when "washingtonpost" then { url: "http://img.kiosko.net/#DATE#/us/washington_post.750.jpg", no_slashes: false}
      when "usatoday" then { url: "http://img.kiosko.net/#DATE#/us/usa_today.750.jpg", no_slashes: false}

      # Francia
      when "monde" then { url: "http://www.lemonde.fr/journalelectronique/donnees/libre/#DATE#/QUO/img_pleinepage/1.jpg", no_slashes: true}

      # España
      when "pais" then { url: "http://img.kiosko.net/#DATE#/es/elpais.750.jpg", no_slashes: false }

      # Italia
      when "corrieredellasera" then {url: "http://img.kiosko.net/#DATE#/it/corriere_della_sera.750.jpg", no_slashes: false}
      when "corriere" then {url: "http://img.kiosko.net/#DATE#/it/corriere_della_sera.750.jpg", no_slashes: false}

      # United Kingdom
      when "times" then {url: "http://img.kiosko.net/#DATE#/uk/the_times.750.jpg", no_slashes: false }

      when "lista" then lista_portadas(msg)

    get_portada(msg, diario) if diario
