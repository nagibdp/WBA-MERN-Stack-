//--------------------------------Intento de web scaping para login--------------------------------
import puppeteer from "puppeteer";

const browserP = puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  headless: true,
});

export const getCaptcha = async (req, res) => {
  let page;
  //console.log(body_filtros);
  (async () => {
    page = await (await browserP).newPage();
    await page.setUserAgent(
      "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    );
    await page.goto("https://www.saes.esimecu.ipn.mx/");
    await page.waitForSelector(
      "#c_default_ctl00_leftcolumn_loginuser_logincaptcha_CaptchaImage"
    );

    (r) => setTimeout(r, 2000);
    const out = await page.evaluate(() => {
      var elemento = document.getElementById(
        "c_default_ctl00_leftcolumn_loginuser_logincaptcha_CaptchaImage"
      ).src;
      return elemento;
    });
    res.json(out);
    //console.log(out);
  })().finally(async () => await page.close());
};

export const postLogin = async (req, res) => {
  const body_filtros = req.body;
  console.log(req.body);
  const page = await (await browserP).newPage();
  const cookies = req.body.cookies;
  //console.log(cookies);

  if (body_filtros.url.length == 0) {
    //console.log(`backenddddd ${body_filtros.url.length}`);
    await page.setUserAgent(
      "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    );
    await page.goto("https://www.saes.esimecu.ipn.mx/");
    const cookie = await page.cookies();
    await page.waitForSelector(
      "#c_default_ctl00_leftcolumn_loginuser_logincaptcha_CaptchaImage"
    );
    (r) => setTimeout(r, 2000);
    const out = await page.evaluate(() => {
      var elemento = document.getElementById(
        "c_default_ctl00_leftcolumn_loginuser_logincaptcha_CaptchaImage"
      ).src;
      return elemento;
    });
    //console.log({"out":out,"cookie":cookie});
    await page.close();
    return res.send({"out":out,"cookie":cookie});
  } else {

    await page.setCookie(...cookies)
    await page.goto("https://www.saes.esimecu.ipn.mx/");
    await page.waitForSelector("#ctl00_leftColumn_LoginUser_LoginButton");
    //(r) => setTimeout(r, 6000);
    await page.type("#ctl00_leftColumn_LoginUser_UserName", body_filtros.user);
    await page.type("#ctl00_leftColumn_LoginUser_Password", body_filtros.pass);
    await page.type(
      "#ctl00_leftColumn_LoginUser_CaptchaCodeTextBox",
      body_filtros.captcha
    );

    await Promise.all([
      page.$eval(`#ctl00_leftColumn_LoginUser_LoginButton`, (element) =>
        element.click()
      ),
      await page.waitForNavigation(),
    ]);

    (r) => setTimeout(r, 3000);
    //console.log(res.body);
    //await page.waitForTimeout(3000);
    let response = await page.screenshot({
      encoding: "base64",
      fullPage: true,
    });
    //console.log(response)
    //res.json(response)
    let salida = { base64: response };
    //console.log(salida);
    res.send(`${response}`);
    await page.close();
  }
};
