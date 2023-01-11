using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ticketBurgasAPI.Models;

namespace ticketBurgasAPI.Data
{
    public partial class TicketBurgasDbContext : DbContext
    {
        public TicketBurgasDbContext()
        {
        }

        public TicketBurgasDbContext(DbContextOptions<TicketBurgasDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BusTicket> BusTickets { get; set; } = null!;
        public virtual DbSet<BusTicketDetail> BusTicketDetails { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_general_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<BusTicket>(entity =>
            {
                entity.HasKey(e => e.BarCode)
                    .HasName("PRIMARY");

                entity.ToTable("bus_tickets");

                entity.HasIndex(e => e.Tdid, "tdid");

                entity.HasIndex(e => e.Uid, "uid");

                entity.Property(e => e.BarCode)
                    .HasMaxLength(12)
                    .HasColumnName("barCode");

                entity.Property(e => e.DateOfExpire)
                    .HasColumnType("datetime")
                    .HasColumnName("dateOfExpire")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.DateOfIssue)
                    .HasColumnType("datetime")
                    .HasColumnName("dateOfIssue")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Tdid)
                    .HasColumnType("int(11)")
                    .HasColumnName("tdid");

                entity.Property(e => e.Uid)
                    .HasColumnType("int(11)")
                    .HasColumnName("uid");

                entity.HasOne(d => d.Td)
                    .WithMany(p => p.BusTickets)
                    .HasForeignKey(d => d.Tdid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("bus_tickets_ibfk_2");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.BusTickets)
                    .HasForeignKey(d => d.Uid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("bus_tickets_ibfk_1");
            });

            modelBuilder.Entity<BusTicketDetail>(entity =>
            {
                entity.ToTable("bus_ticket_details");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Cost).HasColumnName("cost");

                entity.Property(e => e.Issuer)
                    .HasMaxLength(60)
                    .HasColumnName("issuer")
                    .HasDefaultValueSql("'South Station - Burgas / 080040280'");

                entity.Property(e => e.TravelTime)
                    .HasColumnType("int(11)")
                    .HasColumnName("travelTime");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("createdAt")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Deactivated).HasColumnName("deactivated");

                entity.Property(e => e.Email)
                    .HasMaxLength(60)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .HasColumnName("firstName");

                entity.Property(e => e.LastName)
                    .HasMaxLength(20)
                    .HasColumnName("lastName");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
