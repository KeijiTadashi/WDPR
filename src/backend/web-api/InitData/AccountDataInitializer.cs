using webapi.Models;
using webapi.Data;
using Microsoft.AspNetCore.Identity;

namespace webapi.InitData;

public static class AccountDataInitializer
{
    public static void SeedData(UserManager<Account> userManager, RoleManager<IdentityRole> roleManager, WdprContext context)
    {
        SeedRoles(roleManager);
        SeedUsers(userManager);
        SeedDBData(context, userManager);
    }

    private static void SeedRoles(RoleManager<IdentityRole> roleManager)
    {
        // IdentityRole role;
        if (!roleManager.RoleExistsAsync(Roles.Admin).Result)
        {
            IdentityRole role = new IdentityRole();
            role.Name = Roles.Admin;
            roleManager.CreateAsync(role).Wait();
        }
        if (!roleManager.RoleExistsAsync(Roles.Medewerker).Result)
        {
            IdentityRole role = new IdentityRole();
            role.Name = Roles.Medewerker;
            roleManager.CreateAsync(role).Wait();
        }
        if (!roleManager.RoleExistsAsync(Roles.Directie).Result)
        {
            IdentityRole role = new IdentityRole();
            role.Name = Roles.Directie;
            roleManager.CreateAsync(role).Wait();
        }
        if (!roleManager.RoleExistsAsync(Roles.Donateur).Result)
        {
            IdentityRole role = new IdentityRole();
            role.Name = Roles.Donateur;
            roleManager.CreateAsync(role).Wait();
        }


    }

    private static void SeedUsers(UserManager<Account> userManager)
    {
        if (userManager.FindByNameAsync("testadmin@testmail.com").Result == null)
        {
            Medewerker m = new Medewerker()
            {
                UserName = "testadmin@testmail.com",
                Functie = "Senior admin",
                AccountType = "admin"
                // Password = DataEditor.HashPassword("Pass123!")
            };
            var result = userManager.CreateAsync(m, "Pass123?").Result;
            if (result.Succeeded)
            {
                userManager.AddToRoleAsync(m, Roles.Admin).Wait();
            }
            List<Klant> klanten = new List<Klant>();
            for (int i = 0; i < 40; i++)
            {
                userManager.CreateAsync(new Klant() { UserName = "klant" + i + "@mail.com", AccountType = "klant" }, "Pass123?");
            }
        }
    }

    private static void SeedDBData(WdprContext context, UserManager<Account> userManager)
    {
        // if zalen is empty, asume the whole DB is empty and fill everything, but zalen is a small table so doesn't take a lot of time
        if (context.Zalen.Count() == 0)
        {
            List<Zaal> zalen = new List<Zaal>()
            {
                new Zaal(){ Naam = "Zaal 1", Rijen = 15, Kolommen = 10 },
                new Zaal(){ Naam = "Zaal 2", Rijen = 15, Kolommen = 10 },
                new Zaal(){ Naam = "Zaal 3", Rijen = 15, Kolommen = 10 },
                new Zaal(){ Naam = "Zaal 4", Rijen = 15, Kolommen = 10 }
            };
            List<Zitplaats> zitplaatsen = new List<Zitplaats>();
            foreach (Zaal z in zalen)
            {
                for (int row = 1; row <= 15; row++)
                {
                    for (int column = 1; column <= 10; column++)
                    {
                        if (column != 2 && column != 8)
                        {
                            zitplaatsen.Add(new Zitplaats() { Kolom = column, Rij = row, Rang = (row % 4) + 1, Zaal = z, ZaalId = z.ZaalId });
                        }
                        else
                        {
                            zitplaatsen.Add(new Zitplaats() { Kolom = column, Rij = row, Rang = 0, Zaal = z, ZaalId = z.ZaalId });
                        }
                    }
                }
            }
            List<Voorstelling> voorstellingen = new List<Voorstelling>()
            {
                new Voorstelling(){Naam = "War of the Worlds - Jeff Wayne", Beschrijving = "Musical of the War of the Worlds story performed by Jeff Wayne", Soort = "Musical", prijs1 = 35.50f, prijs2 = 23f, prijs3 = 20.99f, prijs4 = 15f},
                new Voorstelling(){Naam = "The lion king", Beschrijving = "Beleef de Koning der Musicals Disney's The Lion King.", Soort = "Musical", prijs1 = 35.50f, prijs2 = 23f, prijs3 = 20.99f, prijs4 = 15f},
                new Voorstelling(){Naam = "1984 - New European Ensemble", Beschrijving = "New European Ensemble laat zien dat de dystopische roman 1984 van George Orwell gigantisch actueel is. De voorspellingen die Orwell in 1949 maakte, lijken hier en daar daadwerkelijk uit te komen. De muzikanten geven dit op een experimentele manier weer door middel van muziek, tekst en beeld. New European Ensemble werkte voor deze voorstelling met behulp van een videoverbinding samen met klokkenluider Edward Snowden. De roman is bewerkt door Mihkel Kerhem.", Soort = "Klassieke concerten", prijs1 = 35.50f, prijs2 = 23f, prijs3 = 20.99f, prijs4 = 15f},
                new Voorstelling(){Naam = "Steven Wilson - The Future Bites Tour", Beschrijving = "De tour van het nieuwe album The Future Bites van Steven Wilson", Soort = "Concert", prijs1 = 35.50f, prijs2 = 23f, prijs3 = 20.99f, prijs4 = 15f}
            };
            List<Uitvoering> uitvoeringen = new List<Uitvoering>();
            int zaalMod = 0;
            foreach (Voorstelling v in voorstellingen)
            {
                zaalMod++;
                for (int i = 0; i < (v.Beschrijving.Length % 10) + 4; i++)
                {
                    string zaalNaam = "Zaal " + (((i + zaalMod) % 4) + 1);
                    var zaal = zalen.Single(z => z.Naam == zaalNaam);
                    uitvoeringen.Add(new Uitvoering() { BeginTijd = DateTime.Now.AddDays(i), EindTijd = DateTime.Now.AddDays(i).AddMinutes(135), Voorstelling = v, Zaal = zaal });
                }
            }
            // List<Medewerker> medewerkers; //maybe skip, put in SeedUsers

            List<Ticket> tickets = new List<Ticket>(); //after klant
            List<Betaling> betalingen = new List<Betaling>();
            List<Account> klanten = userManager.Users.Where(u => u.AccountType == "klant").ToList();
            {
                foreach (Uitvoering uitvoering in uitvoeringen)
                {
                    Random rnd = new Random(DateTime.Now.Microsecond);
                    foreach (Zitplaats zitplaats in zitplaatsen)
                    {
                        if (rnd.Next(1000) >= 985) // 1.5%
                        {
                            Account rndKlant = klanten[rnd.Next(klanten.Count)];
                            Ticket ticket = new Ticket() { Klant = rndKlant, Uitvoering = uitvoering, Zitplaats = zitplaats };
                            betalingen.Add(new Betaling() { Klant = rndKlant, Status = "Betaald", tickets = new List<Ticket>() { ticket } });
                            tickets.Add(ticket);
                        }
                    }
                }
            }
            // List<Donatie> donaties;
            // List<Artiest> artiesten;

            context.Zalen.AddRange(zalen);
            context.Zitplaatsen.AddRange(zitplaatsen);
            context.Voorstellingen.AddRange(voorstellingen);
            context.Uitvoeringen.AddRange(uitvoeringen);
            context.Tickets.AddRange(tickets);
            context.Betalingen.AddRange(betalingen);
            context.SaveChanges();
        }
    }

}